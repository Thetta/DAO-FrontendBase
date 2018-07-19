import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { DevzendaoService } from '../../shared';

@Component({
  selector: 'app-patron-page',
  templateUrl: './patron-page.component.html',
  styleUrls: ['./patron-page.component.css']
})
export class PatronPageComponent implements OnInit {

	formRunAdsInTheNextEpisode: FormGroup;

	constructor(
		public devZenDaoService: DevzendaoService,
		public formBuilder: FormBuilder,
		public matSnackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.initForms();
	}

	/**
	 * Initializes forms with validators
	 */
	initForms() {
		this.formRunAdsInTheNextEpisode = this.formBuilder.group({
			adText: ['', Validators.required]
		});
	}

	/**
	 * Run ads in the next episode
	 */
	runAdsInTheNextEpisode() {
		const adText = this.formRunAdsInTheNextEpisode.controls['adText'].value;
		this.devZenDaoService.runAdsInTheNextEpisode(adText).subscribe(
			(resp) => {
				this.matSnackBar.open(`Рекламное место успешно куплено`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

	/**
	 * Become the next show guest
	 */
	runBecomeTheNextShowGuest() {
		this.devZenDaoService.becomeTheNextShowGuest().subscribe(
			(resp) => {
				this.matSnackBar.open(`Вы стали следующим гостем`, 'Закрыть', {horizontalPosition: 'right', verticalPosition: 'top'});
			},
			(err) => { console.error(err); }
		);
	}

}
