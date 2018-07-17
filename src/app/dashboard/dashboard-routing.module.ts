import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home';
import { OutsiderPageComponent } from './outsider-page';

const routes: Routes = [
		{	
			path: 'dashboard',
			component: DashboardComponent,
			children: [
				{
					path: '',
					redirectTo: 'home',
					pathMatch: 'full'
				},
				{
					path: 'home',
					component: HomeComponent
				},
				{
					path: 'outsider-page',
					component: OutsiderPageComponent
				}
			]
		}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {}
