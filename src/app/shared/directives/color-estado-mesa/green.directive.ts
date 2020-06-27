import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGreen]'
})
export class GreenDirective {

  constructor(element: ElementRef) {
    element.nativeElement.style.color = 'green';
  }

}
