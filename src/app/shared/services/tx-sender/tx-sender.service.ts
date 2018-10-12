import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TxSenderService {

	constructor(
	) {}

	/**
	 * Creates a transaction
	 * @param method 
	 * @param params 
	 * @param data 
	 * @param successMsg 
	 * @param errorMsg 
	 */
	send(method, params = [], data = {}, successMsg = "Успех", errorMsg = "Ошибка"): Observable<any> {
		return from(
			method(...params).send(data)
				.on('transactionHash', (hash) => {
					console.log("Транзакция успешно создана");
				})
				.on('confirmation', (confirmationNumber, receipt) => {
					// on 6th confirmation
					// TODO: delete when bug is fixed https://github.com/ethereum/web3.js/issues/1239
					if(confirmationNumber == 6) {
						console.log("confirmed");
					}
				})
				.on('error', (err) => {
					console.error(err);
				})
		);
	}

}
