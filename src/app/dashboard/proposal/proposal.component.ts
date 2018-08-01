import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { forkJoin, from } from 'rxjs';

import { DevzendaoService } from '../../shared';
import { VoteDialogComponent } from './vote-dialog.component';

@Component({
	selector: 'app-proposal',
	templateUrl: './proposal.component.html',
	styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit {

	proposals = [];

	constructor(
		public devZenDaoService: DevzendaoService,
		public dialog: MatDialog
	) {}

	ngOnInit() {

		let sub;
		// if DevZenDaoService initialized then we don't need to wait for it to load the contracts
		if(this.devZenDaoService.isInitialized) {
			sub = this.devZenDaoService.getProposalsCount();
		} else {
			// wait for the DevZenDaoService to be initialized
			sub = this.devZenDaoService.init.pipe(
				switchMap(() => {
					return this.devZenDaoService.getProposalsCount();
				})
			);
		}

		sub.pipe(
			switchMap(proposalsCount => {
				let requests = [];
				for(let i = 0; i < proposalsCount; i++) {
					let request = this.devZenDaoService.getProposalAtIndex(i).pipe(
						switchMap(proposalAddress => {
							this.proposals[i] = { address: proposalAddress };
							return forkJoin(
								this.devZenDaoService.getVotingStats(proposalAddress),
								this.devZenDaoService.isFinished(proposalAddress),
								this.devZenDaoService.isYes(proposalAddress)
							);
						})
					);
					requests.push(request);
				}
				return forkJoin(requests);
			})
		).subscribe(
			proposalsData => {
				for(let i = 0; i < proposalsData.length; i++) {
					this.proposals[i].data = proposalsData[i];
				}
			},
			err => { console.error(err); }
		)
	}

	/**
	 * Shows voting dialog
	 */
	showVoteDialog(proposal) {
		this.dialog.open(VoteDialogComponent, {
			data: {
				proposal: proposal
			}
		});
	}

}
