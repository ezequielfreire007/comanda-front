import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoEmpleado'
})
export class EstadoEmpleadoPipe implements PipeTransform {

  transform(value: any): string {
    console.log(value);
    switch (value) {
      case 0:
        return 'suspendido';
        break;
      case 1:
        return 'activo';
        break;
      case 2:
        return 'vacaciones';
        break;
      case 3:
        return 'licencia';
      default:
        return null;
        break;
    }

  }

}
