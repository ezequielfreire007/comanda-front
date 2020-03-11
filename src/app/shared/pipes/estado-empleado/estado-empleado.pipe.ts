import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoEmpleado'
})
export class EstadoEmpleadoPipe implements PipeTransform {

  transform(value: any): string {
    console.log(value);
    if (value === 1) {
      return 'activo';
    } else {
      return 'inactivo';
    }
    return null;
  }

}
