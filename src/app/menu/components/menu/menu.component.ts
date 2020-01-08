import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../../../core/models/menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menu: Menu;
  @Output() productClicket: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  addPedido() {
    console.log(`agrega el pedido a la lista de pendientes`);
  }


}
