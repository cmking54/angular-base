import { Player } from './player';
import { MainPlayer } from './mainPlayer';
import { NPC } from './npcPlayer';
import { GameStateService } from '../../services/gameState.service';


export class TurnOrder {
  num_players: number;
  max_players: number;
  curr_index: number;
  queue;
  gameState;

  constructor(max_players: number, gameState: GameStateService) {
    this.num_players = 0;
    this.max_players = max_players;
    this.curr_index = 0;
    this.queue = [];
    this.gameState = gameState;
  }
  add(player: Player) {
    if (this.num_players >= this.max_players) {
      return;
    }
    this.num_players++;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].speed > player.speed) {
        this.queue.splice(i, 1, player);
        break;
      }
    }
    this.queue.push(player);
  }
  next() {
    if (this.queue.length >= 2) {
      let curr_player = this.queue[this.curr_index];
      this.curr_index = (this.curr_index + 1) % this.num_players;
      this.gameState.main = curr_player;
      this.gameState.enemy = this.getOpponents(curr_player)[0]; // choose needed for more
      if (curr_player instanceof NPC) {
        curr_player.perform(); // add opponent selection
      }
      if (curr_player instanceof MainPlayer) {
        curr_player.activateTurn(); // add opponent selection
      }
    } else {
      console.log("Too little players");
    }
  }
  getOpponents(player: player) {
    let ret = [];
    for (let member of this.queue) {
      if (member !== player) { // teams later
        ret.push(member);
      }
    }
    return ret;
  }
  remove(player: Player) {
    this.queue.splice(this.queue.indexOf(player), 1);
    this.num_players--;
  }
}
