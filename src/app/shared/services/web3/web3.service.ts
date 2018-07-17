import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

@Injectable({
  	providedIn: 'root'
})
export class Web3Service {

  	constructor() { }

	/**
	 * Returns accounts for current user
	 */
	getAccounts(): Observable<string[]> {
		return from(web3.eth.getAccounts());
	}

	/**
	 * Checks that browser is connected to ethereum provider
	 */
	isConnected(): Observable<boolean> {
		// check that user has metamask/mist or other provider
		if(!web3.currentProvider) return of(false);
		// check that user has accounts available
		return Observable.create((observer) => {
			this.getAccounts().subscribe(
				(accounts) => {
					observer.next(accounts.length > 0 ? true : false);
					observer.complete();
				},
				(err) => { observer.error(err); }
			);
		});
	}

}
