import { Directive } from '@angular/core';
import { HostBinding } from '@angular/core'; // used to set a css class
@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  constructor() {}
  @HostBinding('class.is_highlighted')
  isHighlighted = true;
}
