import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { GroupMember } from './group-member';
import { DevzendaoService } from '../../shared';

@Component({
	selector: 'app-group-member',
	templateUrl: './group-member.component.html',
	styleUrls: ['./group-member.component.css']
})
export class GroupMemberComponent implements OnInit {

	displayAddGroupMemberDialog = false;
	formGroupMember: FormGroup;
	loading = false;
	members: GroupMember[] = [];

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder,
		public messageService: MessageService
	) {}

	ngOnInit() {
		this.loading = true;

		let sub;
		// if DevZenDaoService initialized then we don't need to wait for it to load the contracts
		if(this.devZenDaoService.isInitialized) {
			sub = this.devZenDaoService.getGroupMembers(this.devZenDaoService.GROUP_DEV_ZEN_TEAM);
		} else {
			// wait for the DevZenDaoService to be initialized
			sub = this.devZenDaoService.init.pipe(
				switchMap(() => {
					return this.devZenDaoService.getGroupMembers(this.devZenDaoService.GROUP_DEV_ZEN_TEAM);
				})
			);
		}

		sub.pipe(
			switchMap(members => {
				let requests = [];
				Object.keys(members).map(
					index => {
						this.members.push(new GroupMember(members[index]));
						requests.push(this.devZenDaoService.balanceOf(members[index], "DZT"));
						requests.push(this.devZenDaoService.balanceOf(members[index], "DZTREP"));	
					}
				);
				return forkJoin(requests);
			})
		).subscribe(
			balances => {
				// assign balances
				for(let i = 0; i < this.members.length; i++) {
					this.members[i].dztBalance = balances[i*2];
					this.members[i].dztRepBalance = balances[i*2+1];
				}
				this.loading = false;
			},
			err => {
				this.messageService.add({severity:'error', summary:'Ошибка', detail:'Ошибка при получении участников группы'});
				this.loading = false; 
				console.error(err); 
			}
		);

		this.initForms();
	}

	/**
	 * Adds member to DevZenTeam group
	 */
	addGroupMember() {
		this.devZenDaoService.addGroupMemberAuto(
			this.devZenDaoService.GROUP_DEV_ZEN_TEAM,
			this.formGroupMember.controls['address'].value
		).subscribe();
		this.displayAddGroupMemberDialog = false;
	}

	/**
	 * Delets member from DevZenTeam group
	 * @param member 
	 */
	deleteGroupMember(member) {
		this.devZenDaoService.removeGroupMemberAuto(this.devZenDaoService.GROUP_DEV_ZEN_TEAM, member.address).subscribe();
	}

	/**
	 * Initializes forms
	 */
	initForms() {
		this.formGroupMember = this.formBuilder.group({
			address: ['', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')]]
		});
	}

}
