import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadableMethodParamPipe, ReadableMethodSignPipe } from './pipes';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ReadableMethodParamPipe,
		ReadableMethodSignPipe
	],
	exports: [
		ReadableMethodParamPipe,
		ReadableMethodSignPipe
	]
})
export class SharedModule { }
