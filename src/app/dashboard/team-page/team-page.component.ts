import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder,
		public matSnackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.initForms();
	}

	/**
	 * Initializes forms with validators
	 */
	initForms() {
		this.formWithdrawEther = this.formBuilder.group({
			output: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
		});
		this.formSelectNextHost = this.formBuilder.group({
			host: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
		});
		this.formChangeTheGuest = this.formBuilder.group({
			guest: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
		});
		this.formEmergencyChangeTheGuest = this.formBuilder.group({
			guest: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
		});
		this.formMoveToNextEpisode = this.formBuilder.group({
			guestHasCome: ['', Validators.required]
		});
	}

	/**
	 * Burn guest stake
	 */
	runBurnGuestStake() {
		this.devZenDaoService.burnGuestStake().subscribe(
			(resp) => {
				this.matSnackBar.open(`DZT гостя сожжены`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Change the guest in "legal" way
	 */
	runChangeTheGuest() {
		const guestAddress = this.formChangeTheGuest.controls['guest'].value;
		this.devZenDaoService.changeTheGuest(guestAddress).subscribe(
			(resp) => {
				this.matSnackBar.open(`Гость успешно выбран`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Change the guest in "emergency" way
	 */
	runEmergencyChangeTheGuest() {
		const guestAddress = this.formEmergencyChangeTheGuest.controls['guest'].value;
		this.devZenDaoService.emergencyChangeTheGuest(guestAddress).subscribe(
			(resp) => {
				this.matSnackBar.open(`Экстренный гость успешно выбран`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Move to next episode
	 */
	runMoveToNextEpisode() {
		// convert to boolean
		const guestHasCome = this.formMoveToNextEpisode.controls['guestHasCome'].value == "true" ? true : false;
		this.devZenDaoService.moveToNextEpisode(guestHasCome).subscribe(
			(resp) => {
				this.matSnackBar.open(`Следующий эпизод успешно создан`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Select next host
	 */
	runSelectNextHost() {
		const hostAddress = this.formSelectNextHost.controls['host'].value;
		this.devZenDaoService.selectNextHost(hostAddress).subscribe(
			(resp) => {
				this.matSnackBar.open(`Следующий организатор успешно выбран`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Withdraw ether
	 */
	runWithdrawEther() {
		const outputAddress = this.formWithdrawEther.controls['output'].value;
		this.devZenDaoService.withdrawEther(outputAddress).subscribe(
			(resp) => {
				this.matSnackBar.open(`Перевод успешно выполнен`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

}
