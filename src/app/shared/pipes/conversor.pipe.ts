import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversor',
  standalone: false
})
export class ConversorPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    if (args[0] === 'euro') {
      return `${'€ ' + value}`
    } else if (args[0] === 'dolar') {
      return `${'$ ' + value}`
    } else {
      return `${'ARS ' + value}`;
    }
  }
}
