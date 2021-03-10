import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstToUpper'
})
export class FirstToUpperPipe implements PipeTransform {

  transform(value: string): string {
     return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
