import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { GroupMember } from './group-member';
import { GroupMemberFormComponent } from './group-member-form.component';
import { DevzendaoService } from '../../shared';

@Component({
	selector: 'app-group-member',
	templateUrl: './group-member.component.html',
	styleUrls: ['./group-member.component.css']
})
export class GroupMemberComponent implements OnInit {

	ngOnInit() {}

	// members: GroupMember[] = [];

	// constructor(
	// 	public devZenDaoService: DevzendaoService,
	// 	public dialog: MatDialog
	// ) {}

	// ngOnInit() {

	// 	let sub;
	// 	// if DevZenDaoService initialized then we don't need to wait for it to load the contracts
	// 	if(this.devZenDaoService.isInitialized) {
	// 		sub = this.devZenDaoService.getGroupMembers(this.devZenDaoService.GROUP_DEV_ZEN_TEAM);
	// 	} else {
	// 		// wait for the DevZenDaoService to be initialized
	// 		sub = this.devZenDaoService.init.pipe(
	// 			switchMap(() => {
	// 				return this.devZenDaoService.getGroupMembers(this.devZenDaoService.GROUP_DEV_ZEN_TEAM);
	// 			})
	// 		);
	// 	}

	// 	sub.pipe(
	// 		switchMap(members => {
	// 			let requests = [];
	// 			Object.keys(members).map(
	// 				index => {
	// 					this.members.push(new GroupMember(members[index]));
	// 					requests.push(this.devZenDaoService.balanceOf(members[index], "DZT"));
	// 					requests.push(this.devZenDaoService.balanceOf(members[index], "DZTREP"));	
	// 				}
	// 			);
	// 			return forkJoin(requests);
	// 		})
	// 	).subscribe(
	// 		balances => {
	// 			// assign balances
	// 			let balanceIndex = 0;
	// 			for(let i = 0; i < this.members.length; i++) {
	// 				this.members[i].dztBalance = balances[i*2];
	// 				this.members[i].dztRepBalance = balances[i*2+1];
	// 			}
	// 		},
	// 		err => { console.error(err); }
	// 	)
	// }

	// /**
	//  * Delets member from DevZenTeam group
	//  * @param member 
	//  */
	// deleteGroupMember(member) {
	// 	this.devZenDaoService.removeGroupMember(this.devZenDaoService.GROUP_DEV_ZEN_TEAM, member.address).subscribe();
	// }

	// /**
	//  * Displays crud form
	//  */
	// showForm() {
	// 	this.dialog.open(GroupMemberFormComponent);
	// }

}
