import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { DevzendaoService, Web3Service } from '../../shared';

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
		this.formBuyTokens = this.formBuilder.group({
			ethSum: ['0.001', [Validators.required, Validators.min(1 / (10 ** 18))]]
		});
	}

	/**
	 * Buy DZT
	 */
	runBuyTokens() {
		const weiSum = this.web3Service.toWei(this.formBuyTokens.controls['ethSum'].value, 'ether');
		this.devZenDaoService.buyTokens(weiSum).subscribe(
			(resp) => {
				this.matSnackBar.open(`Перевод успешно выполнен`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Checks whether 1 week has passed
	 */
	runIsOneWeekPassed() {
		this.devZenDaoService.isOneWeekPassed().subscribe(
			(isOneWeekPassed) => {
				this.matSnackBar.open(`Результат: ${isOneWeekPassed}`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

}
