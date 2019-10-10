import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mv-card',
  templateUrl: 'moveCard.component.html',
  styleUrls: ['moveCard.component.css']
})
export class MoveCardComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  @Input() move;
  @Input() player;
}
