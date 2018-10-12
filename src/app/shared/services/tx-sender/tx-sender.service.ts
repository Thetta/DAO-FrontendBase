import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TxSenderService {

	// constructor(
	// 	public matSnackBar: MatSnackBar
	// ) {}

	// /**
	//  * Creates a transaction
	//  * @param method 
	//  * @param params 
	//  * @param data 
	//  * @param successMsg 
	//  * @param errorMsg 
	//  */
	// send(method, params = [], data = {}, successMsg = "Успех", errorMsg = "Ошибка"): Observable<any> {
	// 	const defaultSnackBarParams: MatSnackBarConfig = {
	// 		horizontalPosition: 'right',
	// 		verticalPosition: 'top'
	// 	};
	// 	return from(
	// 		method(...params).send(data)
	// 			.on('transactionHash', (hash) => {
	// 				this.matSnackBar.open(`Транзакция успешно создана`, 'Закрыть', defaultSnackBarParams);
	// 			})
	// 			.on('confirmation', (confirmationNumber, receipt) => {
	// 				// on 1st confirmation
	// 				// TODO: delete when bug is fixed https://github.com/ethereum/web3.js/issues/1239
	// 				if(confirmationNumber == 1) {
	// 					this.matSnackBar.open(successMsg, 'Закрыть', defaultSnackBarParams);
	// 				}
	// 			})
	// 			.on('error', (err) => {
	// 				this.matSnackBar.open(errorMsg, 'Закрыть', defaultSnackBarParams);
	// 				console.error(err);
	// 			})
	// 	);
	// }

}
