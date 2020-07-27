import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorMayuscula'
})
export class ValorMayusculaPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}
