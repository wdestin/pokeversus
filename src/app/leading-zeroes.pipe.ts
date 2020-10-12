import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZeroes',
})
export class LeadingZeroesPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 10) return '00' + value;
    else if (value < 100) return '0' + value;
    return value.toString();
  }
}
