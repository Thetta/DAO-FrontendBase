import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@NgModule({
	imports: [
		DialogModule,
		ProgressSpinnerModule,
		ToastModule
	],
	exports: [
		DialogModule,
		ProgressSpinnerModule,
		ToastModule
	]
})
export class PrimengCustomModule { }