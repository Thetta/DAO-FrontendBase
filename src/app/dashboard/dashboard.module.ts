import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DaoParamPageComponent } from './dao-param-page';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GroupMemberComponent, GroupMemberFormComponent } from './group-member';
import { HomeComponent } from './home';
import { BecomeTheNextShowGuestDialog, OutsiderPageComponent } from './outsider-page';
import { PatronPageComponent } from './patron-page';
import { ProposalComponent, VoteDialogComponent } from './proposal';
import { CustomMatModule, SharedModule } from '../shared';
import { TeamPageComponent } from './team-page';

@NgModule({
  imports: [
		CommonModule,
		CustomMatModule,
		DashboardRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		SharedModule
  ],
  declarations: [
		BecomeTheNextShowGuestDialog,
		DaoParamPageComponent,
		DashboardComponent,
		GroupMemberComponent,
		GroupMemberFormComponent,
		HomeComponent,
		OutsiderPageComponent,
		PatronPageComponent,
		ProposalComponent,
		TeamPageComponent,
		VoteDialogComponent
  ],
  exports: [
	  	DashboardComponent
  ],
  entryComponents: [
	  BecomeTheNextShowGuestDialog,
	  GroupMemberFormComponent,
	  VoteDialogComponent
  ]
})
export class DashboardModule { }
