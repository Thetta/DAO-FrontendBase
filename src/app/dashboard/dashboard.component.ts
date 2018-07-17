import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Web3Service } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		public web3Service: Web3Service
	) {}

	ngOnInit() {
		this.checkConnection();
	}

  /**
   * Checks that user is connected to ethereum provider and has available accounts
   */
  checkConnection() {
	this.web3Service.isConnected().subscribe(
		(isConnected) => {
			if(!isConnected) this.dialog.open(NoConnectionDialog, { disableClose: true });
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
