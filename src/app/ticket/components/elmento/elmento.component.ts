import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket';

@Component({
  selector: 'app-elmento',
  templateUrl: './elmento.component.html',
  styleUrls: ['./elmento.component.scss']
})
export class ElmentoComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor() { }

  ngOnInit() {
  }

}
