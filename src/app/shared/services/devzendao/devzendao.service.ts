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
	// These methods should be called by DevZen team
	//==============================================

	/**
	 * Update DAO params
	 * @param params 
	 */
	updateDaoParams(params): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.updateDaoParams(params).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Withdraw ether to output address
	 * @param outputAddress 
	 */
	withdrawEther(outputAddress): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.withdrawEther(outputAddress).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Select next host
	 * @param nextHostAddress 
	 */
	selectNextHost(nextHostAddress): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.selectNextHost(nextHostAddress).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Burn guest stake
	 */
	burnGuestStake(): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.burnGuestStake().send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Change the guest in "legal" way
	 * @param guestAddress 
	 */
	changeTheGuest(guestAddress): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.changeTheGuest(guestAddress).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Change the guest in "emergency" way
	 * @param guestAddress 
	 */
	emergencyChangeTheGuest(guestAddress): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.emergency_ChangeTheGuest(guestAddress).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Move to next episode
	 * @param guestHasCome whether guest visited the show
	 */
	moveToNextEpisode(guestHasCome): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.moveToNextEpisode(guestHasCome).send({
				from: accounts[0]
			}))
		);
	}

	//=======================================================
	// These methods should be called by DevZen token holders
	//=======================================================

	/**
	 * Adds adv slot to the next episode
	 * @param adText 
	 */
	runAdsInTheNextEpisode(adText): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.runAdsInTheNextEpisode(adText).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Becomes the next show guest
	 */
	becomeTheNextShowGuest(): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.contract.methods.becomeTheNextShowGuest().send({
				from: accounts[0]
			}))
		);
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
