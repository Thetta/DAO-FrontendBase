import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, from } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TxSenderService {

	constructor(
		public messageService: MessageService
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
					this.messageService.add({severity:'info', summary:'Информация', detail:'Транзакция создана'});
				})
				.on('confirmation', (confirmationNumber, receipt) => {
					// on 6th confirmation
					// TODO: delete when bug is fixed https://github.com/ethereum/web3.js/issues/1239
					if(confirmationNumber == 6) {
						this.messageService.add({severity:'success', summary:'Успех', detail:successMsg});
					}
				})
				.on('error', (err) => {
					this.messageService.add({severity:'error', summary:'Ошибка', detail:errorMsg});
					console.error(err);
				})
		);
	}

}
