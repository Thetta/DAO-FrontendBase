import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaoParamPageComponent } from './dao-param-page';
import { DashboardComponent } from './dashboard.component';
import { GroupMemberComponent } from './group-member';
import { HomeComponent } from './home';
import { OutsiderPageComponent } from './outsider-page';
import { PatronPageComponent } from './patron-page';
import { ProposalComponent } from './proposal';
import { TeamPageComponent } from './team-page';

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
					path: 'dao-param-page',
					component: DaoParamPageComponent
				},
				{
					path: 'team-page',
					component: TeamPageComponent
				},
				{
					path: 'patron-page',
					component: PatronPageComponent
				},
				{
					path: 'outsider-page',
					component: OutsiderPageComponent
				},
				{
					path: 'group-member',
					component: GroupMemberComponent
				},
				{
					path: 'proposal',
					component: ProposalComponent
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
