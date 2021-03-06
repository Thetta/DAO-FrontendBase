import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DaoParamPageComponent } from './dao-param-page';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GroupMemberComponent } from './group-member';
import { HomeComponent } from './home';
import { OutsiderPageComponent } from './outsider-page';
import { PatronPageComponent } from './patron-page';
import { ProposalComponent } from './proposal';
import { PrimengCustomModule, SharedModule } from '../shared';
import { TeamPageComponent } from './team-page';

@NgModule({
  imports: [
		CommonModule,
		DashboardRoutingModule,
		FormsModule,
		PrimengCustomModule,
		ReactiveFormsModule,
		RouterModule,
		SharedModule
  ],
  declarations: [
		DaoParamPageComponent,
		DashboardComponent,
		GroupMemberComponent,
		HomeComponent,
		OutsiderPageComponent,
		PatronPageComponent,
		ProposalComponent,
		TeamPageComponent
  ],
  exports: [
	  	DashboardComponent
  ]
})
export class DashboardModule { }
