import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadableEmptyValuePipe, ReadableMethodParamPipe, ReadableMethodSignPipe } from './pipes';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ReadableEmptyValuePipe,
		ReadableMethodParamPipe,
		ReadableMethodSignPipe
	],
	exports: [
		ReadableEmptyValuePipe,
		ReadableMethodParamPipe,
		ReadableMethodSignPipe
	]
})
export class SharedModule { }
