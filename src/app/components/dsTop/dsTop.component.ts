import { Component, OnInit, Input, OnChanges} from '@angular/core';
// import { DSComponent } from '../DS/ds.component';
import { GameStateService } from '../../services/gameState.service';

@Component({
  selector: 'ds-top',
  templateUrl: './dsTop.component.html',
  styleUrls: ['./dsTop.component.css'],
  // declarations: [DSComponent]
})
export class DSTopComponent implements OnInit {
  @Input() gameState;
  // player;
  // opponent;
  // constructor(private gameState: GameStateService) {}
  ngOnInit() {}
  ngOnChanges(changes) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      // console.log(propName + ": " + changedProp);
      if (propName === "gamestate") {
        this.gameState = changedProp.currentValue;
        // console.log("its me");
        // console.log(changedProp.currentValue);
        // this.player = this.game_state.players[0]; // main
        // this.opponent = this.game_state.players[1];
      }
    }
  }
  getMainHealthStart() {
    return this.gameState.main.getHealthRemaining() *
    GameStateService.HEALTH_WIDTH + GameStateService.MAIN_HEALTH_START;
  }
  getMainHealthWidth() {
    return (1 - this.gameState.main.getHealthRemaining()) * GameStateService.HEALTH_WIDTH;

  }
  getEnemyHealthStart() {
    return this.gameState.enemy.getHealthRemaining() *
    GameStateService.HEALTH_WIDTH + GameStateService.ENEMY_HEALTH_START;
  }
  getEnemyHealthWidth() {
    return (1 - this.gameState.enemy.getHealthRemaining()) * GameStateService.HEALTH_WIDTH;

  }
}
