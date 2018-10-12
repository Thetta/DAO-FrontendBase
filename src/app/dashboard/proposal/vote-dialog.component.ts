import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
		public formBuilder: FormBuilder
	) {}

	ngOnInit() {
		// this.initForms();
	}

	// /**
	//  * Initializes forms
	//  */
	// initForms() {
	// 	this.formVote = this.formBuilder.group({
	// 		vote: ['', Validators.required]
	// 	});
	// }

	// /**
	//  * On cancel voting
	//  */
	// onCancel() {
	// 	this.dialogRef.close();
	// }

	// /**
	//  * On vote
	//  */
	// onVote() {
	// 	this.dialogRef.close();
	// 	const vote = this.formVote.controls['vote'].value == "true" ? true : false;
	// 	this.devZenDaoService.vote(this.data.proposal.address, vote).subscribe();
	// }

}
