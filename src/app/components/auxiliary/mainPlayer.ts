import { Player } from './player';
import { GameStateService } from '../../services/gameState.service';

export class MainPlayer extends Player { // implements Queuable
  turn_active:boolean; // maybe just turn
  constructor(gameState: GameStateService, player?: Player, choice?) {
    super(gameState, player, choice);

  }
  async perform(move, enemy) { // move in as user input
    if (!this.turn_active) {
      return;
    }
    this.turn_active = false;
    if (move.pp_left == 0) {
      this.turn_active = true;
      return;
    } else if (move.pp_left == 1) {
      // set move to be grayed at 1 -> 0
    }
    this.useMoveText(move);
    await this.gameState.sleep(1.25);
    if (move.hit()) {
      // console.log(this);
      this.hitText(this.gameState.enemy); // change to multi-target
      await this.gameState.sleep(0.5);
      this.moveEffectText(move.type, this.gameState.enemy.types);
      await this.gameState.sleep(1);
      if (this.sendDamage(move, this.gameState.enemy)) {
        return; // fainted opponent
      }
    } else {
      this.missText();
    }
    await this.gameState.sleep(1.25);
    this.gameState.players.next();
    this.endTurn();        // end turn
    // this.gameState.players.next();
    // this.gameState.next(); // have a queue for move order
  }
  endTurn() {
    console.log(this.name + " Finished Their Turn");
  }
  onFaint() {
    this.gameState.text = "Game Over!";

    this.gameState.battle_started = false;
    this.gameState.refresh_choices();
    this.gameState.player_chosen = null;
    this.gameState.main = null;
    this.gameState.enemy = null;
  }
  activateTurn() {
    if (this.gameState.battle_started) {
      this.turn_active = true;
      this.startMoveText();
    }
  }
  startMoveText() {
    this.gameState.text = "What should " + this.name + " do?";
  }
}
