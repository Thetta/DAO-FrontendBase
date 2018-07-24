import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

@Injectable({
  	providedIn: 'root'
})
export class Web3Service {

	/**
	 * Connection errors
	 */
	CONNECTION_NO_ERROR = 0;
	CONNECTION_NO_PROVIDER = 1;
	CONNECTION_NOT_LOGGED_IN = 2;

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
	getContract(abi, address): any {
		return new web3.eth.Contract(abi, address);
	}

	/**
	 * Checks that browser is connected to ethereum provider and returns error code
	 */
	getConnectionError(): Observable<number> {
		// check that user has metamask/mist or other provider
		if(!web3.currentProvider) return of(this.CONNECTION_NO_PROVIDER);
		// check that user has accounts available
		return Observable.create((observer) => {
			this.getAccounts().subscribe(
				(accounts) => {
					observer.next(accounts.length > 0 ? this.CONNECTION_NO_ERROR : this.CONNECTION_NOT_LOGGED_IN);
				},
				(err) => { observer.error(err); },
				() => { observer.complete(); }
			);
		});
	}

	/**
	 * Returns current network name, ex: main, ropsten, kovan, rinkeby, private
	 */
	getNetwork(): Observable<string> {
		return from(web3.eth.net.getNetworkType());
	}

	/**
	 * Converts object to solidity tuple, {a: "1", b: "2"} => ["1", "2"]
	 * @param obj 
	 */
	toTuple (obj) {
		if (!(obj instanceof Object)) {
			return [];
		}
		var output = [];
		var i = 0;
		Object.keys(obj).forEach((k) => {
			if (obj[k] instanceof Object) {
			output[i] = this.toTuple(obj[k]);
			} else if (obj[k] instanceof Array) {
			let j1 = 0;
			let temp1 = [];
			obj[k].forEach((ak) => {
				temp1[j1] = this.toTuple(obj[k]);
				j1++;
			});
			output[i] = temp1;
			} else {
			output[i] = obj[k];
			}
			i++;
		});
		return output;
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
