import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mesa } from 'src/app/core/models/mesa';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {

  @Input() mesa: Mesa;
  // @Output() productClicket: EventEmitter<any> = new EventEmitter();
 
  constructor() { }

  ngOnInit() {
  }

  
}
