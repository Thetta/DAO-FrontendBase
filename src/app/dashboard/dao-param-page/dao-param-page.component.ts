import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { DevzendaoService, Web3Service } from '../../shared';

@Component({
  selector: 'app-dao-param-page',
  templateUrl: './dao-param-page.component.html',
  styleUrls: ['./dao-param-page.component.css']
})
export class DaoParamPageComponent implements OnInit {

	formDaoParams: FormGroup;

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder,
		public matSnackBar: MatSnackBar,
		public web3Service: Web3Service
	) { }

	ngOnInit() {
		this.initForms();
	}

	/**
	 * Initializes forms with validators
	 */
	initForms() {
		this.formDaoParams = this.formBuilder.group({
			mintTokensPerWeekAmount: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			mintReputationTokensPerWeekAmount: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			oneTokenPriceInWei: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			oneAdSlotPrice: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			becomeGuestStake: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			repTokensReward_Host: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			repTokensReward_Guest: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			repTokensReward_TeamMembers: ['', [Validators.required, Validators.min(1 / (10 ** 18))]]
		});
	}

	/**
	 * Update DAO params
	 */
	runUpdateDaoParams() {

		let params = {
			mintTokensPerWeekAmount: this.formDaoParams.controls['mintTokensPerWeekAmount'].value,
			mintReputationTokensPerWeekAmount: this.formDaoParams.controls['mintReputationTokensPerWeekAmount'].value,
			oneTokenPriceInWei: this.formDaoParams.controls['oneTokenPriceInWei'].value,
			oneAdSlotPrice: this.formDaoParams.controls['oneAdSlotPrice'].value,
			becomeGuestStake: this.formDaoParams.controls['becomeGuestStake'].value,
			repTokensReward_Host: this.formDaoParams.controls['repTokensReward_Host'].value,
			repTokensReward_Guest: this.formDaoParams.controls['repTokensReward_Guest'].value,
			repTokensReward_TeamMembers: this.formDaoParams.controls['repTokensReward_TeamMembers'].value
		};

		// convert param values to wei
		Object.keys(params).map(key => params[key] = this.web3Service.toWei(String(params[key]), "ether"));

		this.devZenDaoService.updateDaoParams(params).subscribe(
			(resp) => {
				this.matSnackBar.open(`Параметры DAO изменены`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

}