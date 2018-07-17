import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent, NoConnectionDialog } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home';
import { OutsiderPageComponent } from './outsider-page';
import { CustomMatModule } from '../shared';

@NgModule({
  imports: [
		CommonModule,
		CustomMatModule,
		DashboardRoutingModule,
		RouterModule
  ],
  declarations: [
	  	DashboardComponent,
		HomeComponent,
		NoConnectionDialog,
		OutsiderPageComponent
  ],
  exports: [
	  	DashboardComponent
  ],
  entryComponents: [
	  	NoConnectionDialog
  ]
})
export class DashboardModule { }
