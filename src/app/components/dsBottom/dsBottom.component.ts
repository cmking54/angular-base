import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'ds-bottom',
  templateUrl: './dsBottom.component.html',
  styleUrls: ['./dsBottom.component.css']
})
export class DSBottomComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  // player;
  // moves;
  @Input() game_state;
  ngOnChanges(changes) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      console.log(propName + ": " + changedProp);
      if (propName === "game_state") {
        this.game_state = changedProp.currentValue;
        // this.player = this.game_state.players[0]; // main
        // this.moves = this.player.moves;
        // this.opponent = this.game_state.players[1];
      }
    }
  }
}
