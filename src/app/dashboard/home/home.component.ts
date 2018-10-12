import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DevzendaoService, Web3Service } from '../../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	loading = false;
	nextEpisode = {};
	params = {};

	constructor(
		public devZenDaoService: DevzendaoService,
		public messageService: MessageService,
		public web3Service: Web3Service
	) { }

	ngOnInit() {
		this.loading = true;

		let sub;
		// if DevZenDaoService initialized then we don't need to wait for it to load the contracts
		if(this.devZenDaoService.isInitialized) {
			sub = forkJoin(
				this.devZenDaoService.nextEpisode(),
				this.devZenDaoService.getAllParams()
			);
		} else {
			// wait for the DevZenDaoService to be initialized
			sub = this.devZenDaoService.init.pipe(
				switchMap(() => {
					return forkJoin(
						this.devZenDaoService.nextEpisode(),
						this.devZenDaoService.getAllParams()
					);
				})
			);
		}

		sub.subscribe(
			(data) => { 
				this.nextEpisode = data[0]; 
				this.params = data[1];
				// convert all params to readable format
				Object.keys(this.params).map(key => this.params[key] = this.web3Service.fromWei(this.params[key], "ether"));
				this.loading = false;
			},
			(err) => {
				this.loading = false;
				this.messageService.add({severity:'error', summary:'Ошибка', detail:'Ошибка при получении параметров DAO'});
				console.error(err); 
			}
		);
	}

}
