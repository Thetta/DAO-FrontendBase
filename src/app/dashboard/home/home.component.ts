import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DevzendaoService, Web3Service } from '../../shared';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	loading = true;
	nextEpisode = {};
	params = {};

	constructor(
		public devZenDaoService: DevzendaoService,
		public web3Service: Web3Service
	) { }

	ngOnInit() {

		// this.loading = true;

		// let sub;
		// // if DevZenDaoService initialized then we don't need to wait for it to load the contracts
		// if(this.devZenDaoService.isInitialized) {
		// 	sub = forkJoin(
		// 		this.devZenDaoService.getNextEpisode(),
		// 		this.devZenDaoService.getParams()
		// 	);
		// } else {
		// 	// wait for the DevZenDaoService to be initialized
		// 	sub = this.devZenDaoService.init.pipe(
		// 		switchMap(() => {
		// 			return forkJoin(
		// 				this.devZenDaoService.getNextEpisode(),
		// 				this.devZenDaoService.getParams()
		// 			);
		// 		})
		// 	);
		// }

		// sub.subscribe(
		// 	(data) => { 
		// 		this.nextEpisode = data[0]; 
		// 		this.params = data[1];
		// 		// convert all values to readable format
		// 		Object.keys(this.params).map(key => this.params[key] = this.web3Service.fromWei(this.params[key], "ether"));
		// 		this.loading = false;
		// 	},
		// 	(err) => { console.error(err); }
		// );
	}

}
