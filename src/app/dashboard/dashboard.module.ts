import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DaoParamPageComponent } from './dao-param-page';
import { DashboardComponent, NoConnectionDialog } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home';
import { OutsiderPageComponent } from './outsider-page';
import { PatronPageComponent } from './patron-page';
import { CustomMatModule } from '../shared';
import { TeamPageComponent } from './team-page';

@NgModule({
  imports: [
		CommonModule,
		CustomMatModule,
		DashboardRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule
  ],
  declarations: [
		DaoParamPageComponent,
	  	DashboardComponent,
		HomeComponent,
		NoConnectionDialog,
		OutsiderPageComponent,
		PatronPageComponent,
		TeamPageComponent
  ],
  exports: [
	  	DashboardComponent
  ],
  entryComponents: [
	  	NoConnectionDialog
  ]
})
export class DashboardModule { }
