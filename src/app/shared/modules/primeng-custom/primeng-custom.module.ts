import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
	imports: [
		DialogModule,
		ProgressSpinnerModule,
		ToastModule,
		TooltipModule
	],
	exports: [
		DialogModule,
		ProgressSpinnerModule,
		ToastModule,
		TooltipModule
	]
})
export class PrimengCustomModule { }