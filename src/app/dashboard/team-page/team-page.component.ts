import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';

import { DevzendaoService } from '../../shared';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

	formChangeTheGuest: FormGroup;
	formEmergencyChangeTheGuest: FormGroup;
	formMoveToNextEpisode: FormGroup;
	formSelectNextHost: FormGroup;
	formWithdrawEther: FormGroup;
	isTeamMember = false;

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder,
		public messageService: MessageService
	) { }

	ngOnInit() {
		let sub;
		if(this.devZenDaoService.isInitialized) {
			sub = this.devZenDaoService.isTeamMember();
		} else {
			sub = this.devZenDaoService.init.pipe(
				switchMap(() => this.devZenDaoService.isTeamMember())
			);
		}

		sub.subscribe(
			(isTeamMember) => { this.isTeamMember = isTeamMember; },
			(err) => { 
				this.messageService.add({severity:'error', summary:'Error', detail:'Error on getting team member status'});
				console.error(err); 
			}
		);

		this.initForms();
	}

	/**
	 * Initializes forms with validators
	 */
	initForms() {
		this.formWithdrawEther = this.formBuilder.group({
			output: ['', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')]]
		});
		this.formSelectNextHost = this.formBuilder.group({
			host: ['', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')]]
		});
		this.formChangeTheGuest = this.formBuilder.group({
			guest: ['', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')]]
		});
		this.formEmergencyChangeTheGuest = this.formBuilder.group({
			guest: ['', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')]]
		});
		this.formMoveToNextEpisode = this.formBuilder.group({
			guestHasCome: ['true', Validators.required]
		});
	}

	/**
	 * Change the guest in "legal" way
	 */
	runChangeTheGuest() {
		const guestAddress = this.formChangeTheGuest.controls['guest'].value;
		this.devZenDaoService.changeTheGuestAuto(guestAddress).subscribe();
	}

	/**
	 * Change the guest in "emergency" way
	 */
	runEmergencyChangeTheGuest() {
		const guestAddress = this.formEmergencyChangeTheGuest.controls['guest'].value;
		this.devZenDaoService.emergencyChangeTheGuestAuto(guestAddress).subscribe();
	}

	/**
	 * Move to next episode
	 */
	runMoveToNextEpisode() {
		// convert to boolean
		const guestHasCome = this.formMoveToNextEpisode.controls['guestHasCome'].value == "true" ? true : false;
		this.devZenDaoService.moveToNextEpisodeAuto(guestHasCome).subscribe();
	}

	/**
	 * Select next host
	 */
	runSelectNextHost() {
		const hostAddress = this.formSelectNextHost.controls['host'].value;
		this.devZenDaoService.selectNextHostAuto(hostAddress).subscribe();
	}

	/**
	 * Withdraw ether
	 */
	runWithdrawEther() {
		const outputAddress = this.formWithdrawEther.controls['output'].value;
		this.devZenDaoService.withdrawEtherAuto(outputAddress).subscribe();
	}

}
