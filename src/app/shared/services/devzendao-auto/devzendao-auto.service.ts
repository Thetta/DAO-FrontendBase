import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TxSenderService } from '../tx-sender/tx-sender.service';
import { Web3Service } from '../web3/web3.service';

@Injectable({
  	providedIn: 'root'
})
export class DevzendaoAutoService {

	contract;

  	constructor(
		public txSenderService: TxSenderService,
		public web3Service: Web3Service
	) {}

	/**
	 * Initializes contract by truffle build and address
	 * @param contractData 
	 * @param contractAddress 
	 */
	init(contractData, contractAddress) {
		this.contract = this.web3Service.getContract(contractData.abi, contractAddress);
	}

	/**
	 * DevZenDaoAuto methods
	 */

	/**
	 * Updates DAO params and creates a voting
	 * @param params 
	 */
	updateDaoParamsAuto(params): Observable<string> {
		const tupledParams = [this.web3Service.toTuple(params)];
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.contract.methods.updateDaoParamsAuto, 
				tupledParams, 
				{ from: accounts[0] },
				"Голосование 'Обновление параметров DAO' создано",
				"Ошибка создания голосования 'Обновление параметров DAO'"
			))
		);
	}

	/**
	 * Withdraws ether to output address and creates a voting
	 * @param outputAddress 
	 */
	withdrawEtherAuto(outputAddress): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.contract.methods.withdrawEtherAuto, 
				[outputAddress],
				{ from: accounts[0] },
				"Голосование 'Вывод средств' создано",
				"Ошибка создания голосования 'Вывод средств'"
			))
		);
	}

	/**
	 * Selects next host and creates a voting
	 * @param nextHostAddress 
	 */
	selectNextHostAuto(nextHostAddress): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.contract.methods.selectNextHostAuto,
				[nextHostAddress],
				{ from: accounts[0] },
				"Голосование 'Изменение организатора' создано",
				"Ошибка создания голосования 'Изменение организатора'"
			))
		);
	}

	/**
	 * Changes the guest in "legal" way and creates a voting
	 * @param guestAddress 
	 */
	changeTheGuestAuto(guestAddress): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.contract.methods.changeTheGuestAuto,
				[guestAddress],
				{ from: accounts[0] },
				"Голосование 'Смена гостя' создано",
				"Ошибка создания голосования 'Смена гостя'"
			))
		);
	}

	/**
	 * Changes the guest in "emergency" way and creates a voting
	 * @param guestAddress 
	 */
	emergencyChangeTheGuestAuto(guestAddress): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.contract.methods.emergency_ChangeTheGuestAuto,
				[guestAddress],
				{ from: accounts[0] },
				"Голосование 'Экстренная смена гостя' создано",
				"Ошибка создания голосования 'Экстренная Смена гостя'"
			))
		);
	}

	/**
	 * Moves to next episode and creates a voting
	 * @param guestHasCome whether guest visited the show
	 */
	moveToNextEpisodeAuto(guestHasCome): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.contract.methods.moveToNextEpisodeAuto,
				[guestHasCome],
				{ from: accounts[0] },
				"Голосование 'Запуск нового эпизода' создано",
				"Ошибка создания голосования 'Запуск нового эпизода'"
			))
		);
	}

}
