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
	 * Returns hex of the string
	 * @param text 
	 */
	asciiToHex(text): string {
		return web3.utils.asciiToHex(text);
	}

	/**
	 * Returns address/hex from bytes32 hex
	 * @param bytes32Hex 
	 */
	bytes32ToAddress(bytes32Hex): any {
		const decimalNumber = this.hexToNumberString(bytes32Hex);
		return this.numberToHex(decimalNumber);
	}

	/**
	 * Returns hex from the bytes array
	 * @param arrayOfBytes 
	 */
	bytesToHex(arrayOfBytes): any {
		return web3.utils.bytesToHex(arrayOfBytes);
	}

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
	 * Returns ascii representation of a given hex
	 * @param hex 
	 */
	hexToAscii(hex): any {
		return web3.utils.hexToAscii(hex);
	}

	/**
	 * Converts hex string to bytes array
	 * @param hex 
	 */
	hexToBytes(hex): any {
		return web3.utils.hexToBytes(hex);
	}

	/**
	 * Converts hex string to number
	 * @param hex 
	 */
	hexToNumber(hex): any {
		return web3.utils.hexToNumber(hex);
	}

	/**
	 * Converts hex string to number string
	 * @param hex 
	 */
	hexToNumberString(hex): any {
		return web3.utils.hexToNumberString(hex);
	}

	/**
	 * Converts hex to utf8 string
	 * @param hex 
	 */
	hexToUtf8(hex): any {
		return web3.utils.hexToUtf8(hex);
	}

	/**
	 * Converts number to hex
	 * @param n
	 */
	numberToHex(n): any {
		return web3.utils.numberToHex(n);
	}

	/**
	 * Inserts sign to the left of the string and sets length to characterAmount
	 * @param str 
	 * @param characterAmount 
	 * @param sign 
	 */
	padLeft(str, characterAmount, sign = "0"): any {
		return web3.utils.padLeft(str, characterAmount, sign);
	}

	/**
	 * Inserts sign to the right of the string and sets length to characterAmount
	 * @param str 
	 * @param characterAmount 
	 * @param sign 
	 */
	padRight(str, characterAmount, sign = "0"): any {
		return web3.utils.padRight(str, characterAmount, sign);
	}

	/**
	 * Returns sha3(keccak256) hash of the string
	 * @param value 
	 */
	sha3(str): any {
		return web3.utils.sha3(str);
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

	/**
	 * Converts utf8 str to hex
	 * @param str 
	 */
	utf8ToHex(str): any {
		return web3.utils.utf8ToHex(str);
	}

}
