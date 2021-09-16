import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed',
})
export class ToFixedPipe implements PipeTransform {
  transform(value: string, numberOfDigits = 1) {
    return Number(value).toFixed(numberOfDigits);
  }
}
