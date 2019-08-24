import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name: 'custom'
})
export class CustomPipe implements PipeTransform {
    transform(value: any) {
        let result = value.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
    // transform(value: any) {
    //     if (value.length > 10) {
    //         return value.substr(0 ,10) + ' ...';
    //     }
    //     return value;
    // }
}