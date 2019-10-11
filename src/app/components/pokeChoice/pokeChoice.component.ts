import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pk-choice',
  templateUrl: 'pokeChoice.component.html',
  styleUrls: ['pokeChoice.component.css']
})
export class PokeChoiceComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  @Input() choice;
}
