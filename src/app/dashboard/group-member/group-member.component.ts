import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { GroupMember } from './group-member';
import { DevzendaoService, Web3Service } from '../../shared';

@Component({
	selector: 'app-group-member',
	templateUrl: './group-member.component.html',
	styleUrls: ['./group-member.component.css']
})
export class GroupMemberComponent implements OnInit {

	displayAddGroupMemberDialog = false;
	formGroupMember: FormGroup;
	isTeamMember = false;
	loading = false;
	members: GroupMember[] = [];

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder,
		public messageService: MessageService,
		public web3Service: Web3Service
	) {}

	ngOnInit() {
		this.loading = true;

		let sub;
		// if DevZenDaoService initialized then we don't need to wait for it to load the contracts
		if(this.devZenDaoService.isInitialized) {
			sub = forkJoin(
				this.devZenDaoService.getGroupMembers(this.devZenDaoService.GROUP_DEV_ZEN_TEAM),
				this.devZenDaoService.isTeamMember()
			); 
		} else {
			// wait for the DevZenDaoService to be initialized
			sub = this.devZenDaoService.init.pipe(
				switchMap(() => {
					return forkJoin(
						this.devZenDaoService.getGroupMembers(this.devZenDaoService.GROUP_DEV_ZEN_TEAM),
						this.devZenDaoService.isTeamMember()
					); 
				})
			);
		}

		sub.pipe(
			switchMap(data => {
				const members = data[0];
				this.isTeamMember = data[1];
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
				this.messageService.add({severity:'error', summary:'Error', detail:'Error on getting team members'});
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
