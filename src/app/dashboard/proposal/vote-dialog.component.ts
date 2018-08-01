import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { DevzendaoService } from '../../shared';

@Component({
	selector: 'app-vote-dialog',
	templateUrl: './vote-dialog.component.html',
	styleUrls: ['./vote-dialog.component.css']
})
export class VoteDialogComponent implements OnInit {

	formVote: FormGroup;

	constructor(
		public devZenDaoService: DevzendaoService,
		public dialogRef: MatDialogRef<VoteDialogComponent>,
		public formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data,
		public matSnackBar: MatSnackBar
	) {}

	ngOnInit() {
		this.initForms();
	}

	/**
	 * Initializes forms
	 */
	initForms() {
		this.formVote = this.formBuilder.group({
			vote: ['', Validators.required]
		});
	}

	/**
	 * On cancel voting
	 */
	onCancel() {
		this.dialogRef.close();
	}

	/**
	 * On vote
	 */
	onVote() {
		this.dialogRef.close();
		const vote = this.formVote.controls['vote'].value == "true" ? true : false;
		this.devZenDaoService.vote(this.data.proposal.address, vote).subscribe(
			resp => {
				this.matSnackBar.open(`Транзакция успешно создана`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			err => { console.error(err); }
		);
	}

}
