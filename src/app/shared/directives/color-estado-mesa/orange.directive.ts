import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOrange]'
})
export class OrangeDirective {

  constructor(element: ElementRef) {
    element.nativeElement.style.color = 'orange';
  }

}
