import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadableMethodSignPipe } from './pipes';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ReadableMethodSignPipe
	],
	exports: [
		ReadableMethodSignPipe
	]
})
export class SharedModule { }
