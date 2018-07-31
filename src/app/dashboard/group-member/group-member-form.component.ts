import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { DevzendaoService } from '../../shared';

@Component({
	selector: 'group-member-form',
	templateUrl: './group-member-form.component.html',
  })
  export class GroupMemberFormComponent implements OnInit {
  
	formGroupMember: FormGroup;

	constructor(
		public devZenDaoService: DevzendaoService,
		public dialogRef: MatDialogRef<GroupMemberFormComponent>,
		public formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.initForms();
	}

	/**
	 * Initializes forms
	 */
	initForms() {
		this.formGroupMember = this.formBuilder.group({
			address: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
		});
	}

	/**
	 * On cancel saving
	 */
	onCancel() {
		this.dialogRef.close();
	}

	/**
	 * On save
	 */
	onSave() {
		this.dialogRef.close();
		this.devZenDaoService.addGroupMember(
			this.devZenDaoService.GROUP_DEV_ZEN_TEAM,
			this.formGroupMember.controls['address'].value
		).subscribe(
			resp => {
				console.log(resp);
			},
			err => { console.error(err); }
		);
	}

  }
  