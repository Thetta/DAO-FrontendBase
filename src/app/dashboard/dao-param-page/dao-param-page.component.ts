import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

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
		public web3Service: Web3Service
	) { }

	ngOnInit() {

		this.initForms();

		let sub;
		if(this.devZenDaoService.isInitialized) {
			sub = this.devZenDaoService.getAllParams()
		} else {
			sub = this.devZenDaoService.init.pipe(
				switchMap(() => this.devZenDaoService.getAllParams())
			);
		}

		sub.subscribe(
			(params) => {
				// assign values from params to form
				Object.keys(params).map(key => {
					if(this.formDaoParams.controls[key]) {
						let value = this.web3Service.fromWei(params[key], "ether");
						this.formDaoParams.controls[key].setValue(value);
					}
				});
			},
			(err) => { console.error(err); }
		);
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
			repTokensRewardHost: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			repTokensRewardGuest: ['', [Validators.required, Validators.min(1 / (10 ** 18))]],
			repTokensRewardTeamMembers: ['', [Validators.required, Validators.min(1 / (10 ** 18))]]
		});
	}

	/**
	 * Updates DAO param
	 */
	runSetParam(hashedParamName) {
		const paramInfo = this.devZenDaoService.getParamInfoByHash(hashedParamName);
		const value = this.web3Service.toWei(String(this.formDaoParams.controls[paramInfo.name].value), "ether");
		this.devZenDaoService.updateDaoParamsAuto(hashedParamName, value).subscribe();
	}

}
