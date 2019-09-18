import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name: 'custom'
})
export class CustomPipe implements PipeTransform {
    transform(value: any) {
        let result = value.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}