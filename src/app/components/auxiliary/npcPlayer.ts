import { Player } from './player';
import { Move } from './move';
import { GameStateService } from '../../services/gameState.service';

export class NPC extends Player { // implements Queuable
  // moves_possible;
  constructor(gameState: GameStateService, player?: Player, choice?) {
    super(gameState, player, choice);
    // this.moves_possible = this; // increase if moves increase
  }
  async perform() { // move in as user input
  // console.log(this);
    this.startMoveText();
    await this.gameState.sleep(1.25);
    let move_num = Math.floor(Math.random()*this.moves_possible().length);
    let move: Move = this.moves[this.moves_possible()[move_num]];
    if (move.pp_left == 1) {
      // set move to be grayed at 1 -> 0
      this.moves_possible().splice(this.moves_possible().indexOf(move_num),1); // remove the move on last use
    }
    this.useMoveText(move);
    await this.gameState.sleep(1.25);
    if (move.hit()) {
      // console.log(this);
      this.hitText(this.gameState.players.getOpponents(this)[0]); // change to multi-target
      await this.gameState.sleep(0.5);
      this.moveEffectText(move.type, this.gameState.players.getOpponents(this)[0].types);
      await this.gameState.sleep(1);
      if (this.sendDamage(move, this.gameState.players.getOpponents(this)[0])) {
        return; // fainted main
      }
    } else {
      this.missText();
    }
    await this.gameState.sleep(1.25);
    this.gameState.players.next();
    // this.gameState.players[0].activateTurn();
  }
  moves_possible() {
    let ret = [];
    for (let i = 0; i < this.moves.length; i++) {
      if (this.moves[i].pp_left > 0) {
        ret.push(i);
      }
    }
    return ret;
  }
  // endTurn() {
  //   console.log(this.name + " Finished Their Turn");
  // }
  onFaint() {
    // console.log(this.name + " Has Fainted");
    let opponent = this.gameState.players.getOpponents(this)[0];
    this.gameState.players.remove(this);
    let new_npc = this.gameState.makeNPC();
    if (this === this.gameState.main) {
      this.gameState.main = new_npc;
    }
    if (this === this.gameState.enemy) {
      this.gameState.enemy = new_npc;
    }
    opponent.levelUp(1);
    new_npc.levelUp(Math.floor(Math.random()*opponent.level/5)+opponent.level);
    this.gameState.players.add(new_npc);
    this.gameState.players.curr_index = 0;
    // console.log(this.gameState.players);
    this.gameState.players.next();
    return;
  }
  startMoveText() {
    this.gameState.text = "What will " + this.name + " do?";
  }

}
  // this.gameState.players.main.levelUp(1);
  // this.gameState.players.enemy = this.gameState.makePlayer(this.gameState.players.enemy.health_start,this.gameState.players.enemy.health_full_width);
  // this.gameState.players.enemy.levelUp(Math.floor(Math.random()*Math.ceil(this.gameState.players.main.level/5)) + this.gameState.players.main.level);
  // // console.log();
  // this.gameState.players.enemy.perform = async function() {
  //
  //   this.gameState.players.main.activateTurn();
