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

	// /**
	//  * Initializes contract by truffle build and address
	//  * @param contractData 
	//  * @param contractAddress 
	//  */
	// init(contractData, contractAddress) {
	// 	this.contract = this.web3Service.getContract(contractData.abi, contractAddress);
	// }

	// /**
	//  * DevZenDaoAuto methods
	//  */

	// /**
	//  * Moves to next episode and creates a voting
	//  * @param guestHasCome whether guest visited the show
	//  */
	// moveToNextEpisodeAuto(guestHasCome): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.contract.methods.moveToNextEpisodeAuto,
	// 			[guestHasCome],
	// 			{ from: accounts[0] },
	// 			"Голосование 'Запуск нового эпизода' создано",
	// 			"Ошибка создания голосования 'Запуск нового эпизода'"
	// 		))
	// 	);
	// }

}
