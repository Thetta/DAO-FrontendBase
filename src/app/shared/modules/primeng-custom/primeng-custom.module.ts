import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@NgModule({
	imports: [
		ProgressSpinnerModule,
		ToastModule
	],
	exports: [
		ProgressSpinnerModule,
		ToastModule
	]
})
export class PrimengCustomModule { }