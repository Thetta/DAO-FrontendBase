import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readableEmptyValue' })
export class ReadableEmptyValuePipe implements PipeTransform {

	transform(value: string) {
        let result = "No data";
        if(value == "0x0000000000000000000000000000000000000000") result = "Not set";
        return result;
	}

}
