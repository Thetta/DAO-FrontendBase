import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment as env } from '../../../../environments/environment';
import { Web3Service } from '../web3/web3.service';

@Injectable({
	providedIn: 'root'
})
export class DevzendaoService {

	contract: any;

	daoContract: any;
	dztTokenContract: any;
	dztRepTokenContract: any;
	factoryContract: any;

	constructor(
		public web3Service: Web3Service
	) {
		this.initContracts();
	}

	/**
	 * Initializes contracts
	 */
	initContracts() {
		// load DevZenDaoFactory contract
		this.factoryContract = this.web3Service.getContract(env.devZenDaoFactoryAbi, env.devZenDaoFactoryAddress);
		// load DevZenDao contract 
		from(this.factoryContract.methods.dao().call()).pipe(
			switchMap(daoAddress => { 
				this.daoContract = this.web3Service.getContract(env.devZenDaoAbi, daoAddress);
				// load DZT and DZRTEP tokens 
				return forkJoin(
					this.daoContract.methods.devZenToken().call(),
					this.daoContract.methods.repToken().call()
				);
			})
		).subscribe(
			(tokenAddresses) => {
				this.dztTokenContract = this.web3Service.getContract(env.stdDaoTokenAbi, tokenAddresses[0]);
				this.dztRepTokenContract = this.web3Service.getContract(env.stdDaoTokenAbi, tokenAddresses[1]);
			},
			(err) => { console.error(err); }
		);
	}

	//====================
	// Contract properties
	//====================

	/**
	 * Returns next episode details
	 */
	getNextEpisode(): Observable<any> {
		return from(this.daoContract.methods.nextEpisode().call());
	}

	/**
	 * Returns dao params
	 */
	getParams(): Observable<any> {
		return from(this.daoContract.methods.params().call());
	}

	//==============================================
	// These methods should be called by DevZen team
	//==============================================

	/**
	 * Update DAO params
	 * @param params 
	 */
	updateDaoParams(params): Observable<any> {
		const tupledParams = this.web3Service.toTuple(params);
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.daoContract.methods.updateDaoParams(tupledParams).send({
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
			switchMap(accounts => this.daoContract.methods.withdrawEther(outputAddress).send({
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
			switchMap(accounts => this.daoContract.methods.selectNextHost(nextHostAddress).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Burn guest stake
	 */
	burnGuestStake(): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.daoContract.methods.burnGuestStake().send({
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
			switchMap(accounts => this.daoContract.methods.changeTheGuest(guestAddress).send({
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
			switchMap(accounts => this.daoContract.methods.emergency_ChangeTheGuest(guestAddress).send({
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
			switchMap(accounts => this.daoContract.methods.moveToNextEpisode(guestHasCome).send({
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
			switchMap(accounts => this.daoContract.methods.runAdsInTheNextEpisode(adText).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Becomes the next show guest
	 */
	becomeTheNextShowGuest(): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.daoContract.methods.becomeTheNextShowGuest().send({
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
			switchMap(accounts => this.daoContract.methods.buyTokens().send({
				from: accounts[0],
				value: valueInWei
			}))
		);
	}

	/**
	 * Checks whether 1 week has passed
	 */
	isOneWeekPassed(): Observable<boolean> {
		return from(this.daoContract.methods.isOneWeekPassed().call());
	}

	//====================
	// StdDaoToken methods
	//====================

	/**
	 * Approve spending DZT or DZTREP for DAO
	 * @param amount 
	 * @param tokenName 
	 */
	approve(amount, tokenName) {
		let baseContract = null;
		if(tokenName == 'DZT') baseContract = this.dztTokenContract;
		if(tokenName == 'DZTREP') baseContract = this.dztRepTokenContract;
		if(!baseContract) throw new Error(`token name ${tokenName} not found, available: DZT, DZTREP`);

		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => baseContract.methods.approve(this.daoContract.options.address, amount).send({
				from: accounts[0]
			}))
		);
	}

	/**
	 * Returns address balance by token name
	 * @param address 
	 * @param tokenName 
	 */
	balanceOf(address, tokenName): Observable<number> {
		let baseContract = null;
		if(tokenName == 'DZT') baseContract = this.dztTokenContract;
		if(tokenName == 'DZTREP') baseContract = this.dztRepTokenContract;
		if(!baseContract) throw new Error(`token name ${tokenName} not found, available: DZT, DZTREP`);

		return from(baseContract.methods.balanceOf(address).call());
	}

}
