import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
// all above

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AdditionalComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  // my work below
  thing = "Different Stuff";
  @Input() addComp; // if nothing added to parenthesis, variable is default
  // @Input('ADDCOMPALIAS') is not recommended
  @Output() addMoreAdd = new EventEmitter();
  onAdd() {
    console.log('adding');
    this.addMoreAdd.emit(this.addComp);
  }
}
