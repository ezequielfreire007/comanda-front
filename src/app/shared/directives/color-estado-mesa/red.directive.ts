import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  constructor(element: ElementRef) {
    element.nativeElement.style.color = 'red';
  }

}
