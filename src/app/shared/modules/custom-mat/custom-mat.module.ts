import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
	MatDialogModule,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule
  ],
  exports: [
	MatDialogModule,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule
  ]
})
export class CustomMatModule { }
