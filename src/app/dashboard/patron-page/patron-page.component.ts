import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
		public formBuilder: FormBuilder
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
		this.devZenDaoService.runAdsInTheNextEpisode(adText).subscribe();
	}

}
