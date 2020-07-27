import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadosMesa'
})
export class EstadosMesaPipe implements PipeTransform {

  transform(value: any): string {
    console.log(value);
    switch (value) {
      case 1:
        return 'esperando'.toUpperCase();
        break;
      case 2:
        return 'comiendo'.toUpperCase();
        break;
      case 3:
        return 'reservada'.toUpperCase();
        break;
      case 4:
        return 'cerrada'.toUpperCase();
      case 5:
        return 'pidiendo cuenta'.toUpperCase();
      case 6:
        return 'abierta'.toUpperCase();
        default:
        return null;
        break;
    }

  }

}
