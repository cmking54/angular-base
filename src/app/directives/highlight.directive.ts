import { Directive } from '@angular/core';
import { HostBinding } from '@angular/core'; // used to set a css class
import { Input } from '@angular/core';

import { HostListener } from '@angular/core';

@Directive({
  selector: '[abHighlight]'
})
export class HighlightDirective {
  constructor() {}
  @HostBinding('class.is_highlighted')
  isHighlighted = true;
  @Input() set abHighlight(value) {
    this.isHighlighted = value;
  }

  @HostBinding('class.is_highlighted-hovering')
  hovering = false;
  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHighlighted = this.hovering = true;
    
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHighlighted = this.hovering = false;
  }

}
