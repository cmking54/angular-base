import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GameStateService } from '../../services/gameState.service';


@Component({
  selector: 'ds-bottom',
  templateUrl: './dsBottom.component.html',
  styleUrls: ['./dsBottom.component.css'],
  // providers: [GameStateService]
})
export class DSBottomComponent implements OnInit {
  // constructor(private gameState: GameStateService) {}
  ngOnInit() {}
  // player;
  // moves;
  @Input() gameState;
  ngOnChanges(changes) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      // console.log(propName + ": " + changedProp);
      if (propName === "gameState") {
        this.gameState = changedProp.currentValue;
        // this.player = this.game_state.players[0]; // main
        // this.moves = this.player.moves;
        // this.opponent = this.game_state.players[1];
      }
    }
  }
}
