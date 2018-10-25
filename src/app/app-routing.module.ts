import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetamaskNotAllowedNetworkComponent } from './metamask-not-allowed-network';
import { MetamaskNotInstalledComponent } from './metamask-not-installed';
import { MetamaskNotLoggedInComponent } from './metamask-not-logged-in';
import { PageNotFoundComponent } from './page-not-found';

const routes: Routes = [
	{ 
		path: '', 
		redirectTo: '/dashboard/home', 
		pathMatch: 'full' 
	},
	{
		path: 'metamask-not-allowed-network',
		component: MetamaskNotAllowedNetworkComponent
	},
	{
		path: 'metamask-not-installed',
		component: MetamaskNotInstalledComponent
	},
	{
		path: 'metamask-not-logged-in',
		component: MetamaskNotLoggedInComponent
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  	exports: [ RouterModule ]
})
export class AppRoutingModule {}