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

	ethBalance: number = 0;

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
					this.updateToolbarBalances();
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
		this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.web3Service.getBalance(accounts[0]))
		).subscribe(
			(ethBalance) => { this.ethBalance = this.web3Service.fromWei(ethBalance, "ether"); },
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
