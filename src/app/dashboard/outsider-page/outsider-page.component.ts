import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DevzendaoService, Web3Service } from '../../shared';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-outsider-page',
  templateUrl: './outsider-page.component.html',
  styleUrls: ['./outsider-page.component.css']
})
export class OutsiderPageComponent implements OnInit {

	formBuyTokens: FormGroup;

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder,
		public matDialog: MatDialog,
		public web3Service: Web3Service
	) { }

	ngOnInit() {
		this.initForms();
	}

	/**
	 * Initializes forms with validators
	 */
	initForms() {
		this.formBuyTokens = this.formBuilder.group({
			ethSum: ['0.001', [Validators.required, Validators.min(1 / (10 ** 18))]]
		});
	}

	/**
	 * Become the next show guest
	 */
	runBecomeTheNextShowGuest() {
		// get become guest stake and show modal
		this.devZenDaoService.getParams().subscribe(
			(params) => {
				const becomeGuestStake = this.web3Service.fromWei(params['becomeGuestStake'], "ether");
				this.matDialog.open(BecomeTheNextShowGuestDialog, { data: { becomeGuestStake: becomeGuestStake }});
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Buy DZT
	 */
	runBuyTokens() {
		const weiSum = this.web3Service.toWei(this.formBuyTokens.controls['ethSum'].value, 'ether');
		this.devZenDaoService.buyTokens(weiSum).subscribe();
	}

}

/**
 * Become the next show guest dialog
 */
@Component({
	selector: 'become-the-next-show-guest-dialog',
	template: `
		<div mat-dialog-content>
			<p>Чтобы стать гостем, вам нужно положить в стейк {{ data.becomeGuestStake }} DZT токенов. Вы уверены?</p>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="onCancel()">Отмена</button>
			<button mat-button (click)="onOk()">Ok</button>
		</div>
	`,
})
export class BecomeTheNextShowGuestDialog {

	constructor(
		public devZenDaoService: DevzendaoService,
		public dialogRef: MatDialogRef<BecomeTheNextShowGuestDialog>,
		@Inject(MAT_DIALOG_DATA) public data,
		public web3Service: Web3Service
	) {}

	/**
	 * On calcel click close dialog
	 */
	onCancel() {
		this.dialogRef.close();
	}

	/**
	 * On OK click to approve and become the next show guest
	 */
	onOk() {
		this.dialogRef.close();
		
		const weiSum = this.web3Service.toWei(this.data.becomeGuestStake, 'ether');

		// approve for dao to spend user's DZT to put at stake and become the next show guest
		this.devZenDaoService.approve(weiSum, "DZT").pipe(
			switchMap(() => { return this.devZenDaoService.becomeTheNextShowGuest(); })
		).subscribe();
	}
  
}
