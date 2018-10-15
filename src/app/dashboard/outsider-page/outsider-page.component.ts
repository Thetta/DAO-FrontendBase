import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { DevzendaoService, Web3Service } from '../../shared';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-outsider-page',
  templateUrl: './outsider-page.component.html',
  styleUrls: ['./outsider-page.component.css']
})
export class OutsiderPageComponent implements OnInit {

	becomeGuestStakeInEth = null;
	displayBecomeTheNextShowGuestDialog = false;
	formBuyTokens: FormGroup;
	params = {};

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder,
		public messageService: MessageService,
		public web3Service: Web3Service
	) { }

	ngOnInit() {
		let sub;
		// if DevZenDaoService initialized then we don't need to wait for it to load the contracts
		if(this.devZenDaoService.isInitialized) {
			sub = this.devZenDaoService.getAllParams()
		} else {
			// wait for the DevZenDaoService to be initialized
			sub = this.devZenDaoService.init.pipe(
				switchMap(() => this.devZenDaoService.getAllParams())
			);
		}

		sub.subscribe(
			params => { 
				this.params = params;
				this.becomeGuestStakeInEth = this.web3Service.fromWei(String(this.params['becomeGuestStake']), "ether");
			},
			err => {
				this.messageService.add({severity:'error', summary:'Ошибка', detail:'Ошибка при получении параметров DAO'});
				console.error(err);
			}
		)

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
		// approve for dao to spend user's DZT to put at stake and become the next show guest
		this.devZenDaoService.approve(this.params['becomeGuestStake'], "DZT").pipe(
			switchMap(() => { return this.devZenDaoService.becomeTheNextShowGuest(); })
		).subscribe();
		this.displayBecomeTheNextShowGuestDialog = false;
	}

	/**
	 * Buy DZT
	 */
	runBuyTokens() {
		const weiSum = this.web3Service.toWei(String(this.formBuyTokens.controls['ethSum'].value), 'ether');
		this.devZenDaoService.buyTokens(weiSum).subscribe();
	}

}
