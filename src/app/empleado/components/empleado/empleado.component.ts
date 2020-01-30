import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empleado } from 'src/app/core/models/empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  @Input() empleado: Empleado;

  constructor() { }

  ngOnInit() {
  }

}
