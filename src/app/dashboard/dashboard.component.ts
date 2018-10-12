import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DevzendaoService, Web3Service } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	ethBalance = 0;
	dztBalance = 0;
	dztRepBalance = 0;
	isToolbarLoading = true;

	constructor(
		public devZenDaoService: DevzendaoService,
		public router: Router,
		public web3Service: Web3Service
	) {}

	ngOnInit() {
		// // check that user is connected to ethereum provider and has available accounts
		// this.web3Service.getConnectionError().subscribe(
		// 	(errorCode) => {
		// 		if(!errorCode) {
		// 			// update toolbal balances
		// 			if(this.devZenDaoService.isInitialized) {
		// 				this.updateToolbarBalances();
		// 			} else {
		// 				this.devZenDaoService.init.subscribe(
		// 					(resp) => { this.updateToolbarBalances(); },
		// 					(err) => { console.error(err); }
		// 				);
		// 			}
		// 		} else {
		// 			if(errorCode == this.web3Service.CONNECTION_NO_PROVIDER) {
		// 				this.router.navigate(['metamask-not-installed']);
		// 			}
		// 			if(errorCode == this.web3Service.CONNECTION_NOT_LOGGED_IN) {
		// 				this.router.navigate(['metamask-not-logged-in']);
		// 			}
		// 		}
		// 	},
		// 	(err) => { console.error(err); }
		// );
	}

	// /**
	//  * Updates balances in toolbar
	//  */
	// updateToolbarBalances() {
	// 	this.isToolbarLoading = true;
	// 	this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => {
	// 			return forkJoin(
	// 				this.web3Service.getBalance(accounts[0]),
	// 				this.devZenDaoService.balanceOf(accounts[0], "DZT"),
	// 				this.devZenDaoService.balanceOf(accounts[0], "DZTREP")
	// 			);
	// 		})
	// 	).subscribe(
	// 		(balances) => {
	// 			this.ethBalance = this.web3Service.fromWei(balances[0], "ether");
	// 			this.dztBalance = this.web3Service.fromWei(balances[1], "ether");
	// 			this.dztRepBalance = this.web3Service.fromWei(balances[2], "ether");
	// 			this.isToolbarLoading = false;
	// 		},
	// 		(err) => { console.error(err); }
	// 	);
	// }

}
