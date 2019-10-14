import { Component, OnInit } from '@angular/core';
import { Player } from '../auxiliary/player';
// import { Move } from '../auxiliary/move';
import { GameStateService } from '../../services/gameState.service';

@Component({
  selector: 'app-ds',
  templateUrl: './ds.component.html',
  styleUrls: ['./ds.component.css']
})
export class DSComponent implements OnInit {
  constructor(private gameState: GameStateService) {
    // this.game_state.refresh_choices();
  }
  ngOnInit() {}

  // player =
  //
  //
  //
  // this.game_state.players.main_extra = {
  //   opponent: this.player,
  //   game_state: this.game_state
  // }
  // player_extra = {
  //   opponent: this.opponent,
  //   game_state: this.game_state
  // }
  // merged = Object.assign(this.player, this.player_extra);
  // merged = Object.assign(this.opponent, this.opponent_extra);
}
