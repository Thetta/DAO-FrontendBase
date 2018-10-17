import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { forkJoin, from } from 'rxjs';

import { DevzendaoService } from '../../shared';

@Component({
	selector: 'app-proposal',
	templateUrl: './proposal.component.html',
	styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit {

	currentProposalAddress = null;
	displayVoteDialog = false;
	formVote: FormGroup;
	loading = false;
	proposals = [];

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.loading = true;

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
				if(proposalsCount == 0) this.loading = false;
				let requests = [];
				for(let i = 0; i < proposalsCount; i++) {
					let request = this.devZenDaoService.getProposalAtIndex(i).pipe(
						switchMap(proposalAddress => {
							this.proposals[i] = { address: proposalAddress };
							return forkJoin(
								this.devZenDaoService.getVotingStats(proposalAddress),
								this.devZenDaoService.isFinished(proposalAddress),
								this.devZenDaoService.isYes(proposalAddress),
								this.devZenDaoService.getMethodSig(proposalAddress),
								this.devZenDaoService.getProposalParams(proposalAddress)
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
				this.loading = false;
			},
			err => { 
				this.loading = false;
				console.error(err); 
			}
		);

		this.initForms();
	}

	/**
	 * Initializes forms
	 */
	initForms() {
		this.formVote = this.formBuilder.group({
			vote: ['true', Validators.required]
		});
	}

	/**
	 * Shows vote dialog
	 */
	showVoteDialog(proposalAddress) {
		this.currentProposalAddress = proposalAddress;
		this.displayVoteDialog = true;
	}

	/**
	 * Vote
	 */
	vote() {
		const voteResult = this.formVote.controls['vote'].value == "true" ? true : false;
		this.devZenDaoService.vote(this.currentProposalAddress, voteResult).subscribe();
		this.displayVoteDialog = false;
	}

}
