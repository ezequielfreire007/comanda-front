import { Pipe, PipeTransform } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Pipe({
  name: 'valorMayuscula'
})
export class ValorMayusculaPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}
