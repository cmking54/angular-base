import { Component, OnInit, Input } from '@angular/core';
import { MainPlayer } from '../auxiliary/mainPlayer';

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
  onClick() {
    if (this.player instanceof MainPlayer) {
      this.player.perform(move);
    }
  }
}
// TODO: style card by type
