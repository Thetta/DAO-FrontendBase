import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
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
		public dialog: MatDialog,
		public web3Service: Web3Service
	) {}

	ngOnInit() {
		// check that user is connected to ethereum provider and has available accounts
		this.web3Service.isConnected().subscribe(
			(isConnected) => {
				if(isConnected) {
					// TODO: wait when devZenDaoService is initialized
					setTimeout(this.updateToolbarBalances(), 1000);
				} else {
					this.dialog.open(NoConnectionDialog, { disableClose: true });
				}
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Updates balances in toolbar
	 */
	updateToolbarBalances() {
		this.isToolbarLoading = true;
		this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				return forkJoin(
					this.web3Service.getBalance(accounts[0]),
					this.devZenDaoService.balanceOf(accounts[0], "DZT"),
					this.devZenDaoService.balanceOf(accounts[0], "DZTREP")
				);
			})
		).subscribe(
			(balances) => {
				this.ethBalance = this.web3Service.fromWei(balances[0], "ether");
				this.dztBalance = this.web3Service.fromWei(balances[1], "ether");
				this.dztRepBalance = this.web3Service.fromWei(balances[2], "ether");
				this.isToolbarLoading = false;
			},
			(err) => { console.error(err); }
		);
	}

}

/**
 * No connection dialog
 */
@Component({
	selector: 'no-connection-dialog',
	template: `
		<mat-dialog-content>Ошибка. Не найден Ethereum провайдер или нет доступных счетов.</mat-dialog-content>
		<mat-dialog-actions>
			<button mat-button color="primary" (click)="reload()">Перезагрузить</button>
		</mat-dialog-actions>`,
})
export class NoConnectionDialog {

	constructor(
		public dialogRef: MatDialogRef<NoConnectionDialog>
	) {}

	/**
	 * Reloads browser page
	 */
	reload() {
		location.reload();
	}
}
