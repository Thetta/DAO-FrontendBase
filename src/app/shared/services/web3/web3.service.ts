import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Web3 from 'web3';
import { Contract } from 'web3/types';

const web3 = new Web3(Web3.givenProvider);

@Injectable({
  	providedIn: 'root'
})
export class Web3Service {

  	constructor() { }

	/**
	 * Performs a plain call to blockchain
	 * @param params 
	 */
	call(params): Observable<string> {
		return from(web3.eth.call(params));
	}

	/**
	 * Converts value from wei to unit
	 * @param valueInWei 
	 * @param unit 
	 */
	fromWei(valueInWei, unit) {
		return web3.utils.fromWei(valueInWei, unit);
	}

	/**
	 * Returns accounts for current user
	 */
	getAccounts(): Observable<string[]> {
		return from(web3.eth.getAccounts());
	}

	/**
	 * Returns balance in ETH by address
	 * @param address 
	 */
	getBalance(address): Observable<number> {
		return from(web3.eth.getBalance(address));
	}

	/**
	 * Returns a new contract instance
	 * @param abi 
	 * @param address 
	 */
	getContract(abi, address): Contract {
		return new web3.eth.Contract(abi, address);
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
				},
				(err) => { observer.error(err); },
				() => { observer.complete(); }
			);
		});
	}

	/**
	 * Converts value to unit
	 * @param value 
	 * @param unit 
	 */
	toWei(value, unit) {
		return web3.utils.toWei(value, unit);
	}

}
