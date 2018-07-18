import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Contract } from 'web3/types';

import { environment as env } from '../../../../environments/environment';
import { Web3Service } from '../web3/web3.service';

@Injectable({
	providedIn: 'root'
})
export class DevzendaoService {

	contract: Contract;

	constructor(
		public web3Service: Web3Service
	) {
		this.contract = this.web3Service.getContract(env.contractAbi, env.contractAddress);
	}

	//==============================================
	// These methods should be called by any address
	//==============================================

	/**
	 * Buy DZT
	 * @param valueInWei 
	 */
	buyTokens(valueInWei): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.buyTokens().send({
				from: accounts[0],
				value: valueInWei
			}))
		);
		// return from(this.contract.methods.buyTokens().send({value: valueInWei}));
	}

	/**
	 * Checks whether 1 week has passed
	 */
	isOneWeekPassed(): Observable<boolean> {
		// we run here plain call method because of https://github.com/ethereum/web3.js/issues/1063
		// TODO: refactor when issue is solved
		return Observable.create((observer) => {
			const params = {
				to: env.contractAddress,
				data: this.contract.methods.isOneWeekPassed().encodeABI()
			};
			this.web3Service.call(params).subscribe(
				(isOneWeekPassed) => {
					observer.next(isOneWeekPassed === '0x' ? false : isOneWeekPassed);
				},
				(err) => { observer.error(err); },
				() => { observer.complete(); }
			);
		});
	}

}
