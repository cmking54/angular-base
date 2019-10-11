import { Component, OnInit } from '@angular/core';
import { Player } from '../auxiliary/player';
// import { Move } from '../auxiliary/move';

@Component({
  selector: 'app-ds',
  templateUrl: './ds.component.html',
  styleUrls: ['./ds.component.css']
})
export class DSComponent implements OnInit {
  // readonly
  game_state;
  constructor() {
    this.game_state = {
      pokedex: require('../../../assets/json/pokedex.json'),
      players: [],
      player_chosen: null,
      text: "Waiting for Battle to Start",
      start: function() {
        this.battle_started = true;
        this.load_init();
        this.players[0].activateTurn();
      },
      makePlayer: function(start:number, width:number) {
        return new Player(this.random_item(this.pokedex),start,width,this);
      },
      getRandomBounded: function(n:number):number {
        return Math.floor(Math.random()*n);
      },
      random_item: function(items:Array<object>) {
        var n = this.getRandomBounded(items.length);
        return items[n];
      },
      refresh_choices: function() {
        this.starter_choices = [];
        let choice_num = 3;
        for (let i = 0; i < choice_num; i++) {
          this.starter_choices.push(this.makePlayer(-1,-1));
        }
      },
      load_init: function() {
        this.player_chosen.health_start = 411;
        this.player_chosen.health_full_width = 111;
        let player = this.player_chosen; // main player
        let enemy = this.makePlayer(128,111); // first opponent
        console.log(player);
        this.players.push(player);
        this.players.push(enemy);
        player.perform = async function(move) {
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
          var result = move.action();
          if (result.success) {
            console.log(this);
            this.hitText(this.game_state.players[1]); // change to multi-target
            this.sendDamage(result,this.game_state.players[1]);
          } else {
            this.missText();
          }
          await this.sleep(1);
          // end turn
          this.game_state.players[1].perform(); // have a queue for move order
        };

        enemy.perform = async function(move) {
            this.startMoveText(false);
            await this.sleep(1.25);
            var move_num = Math.floor(Math.random()*this.moves.length);
            var move = this.moves[move_num];
            if (move.pp_left == 1) {
              // set move to be grayed at 1 -> 0
              this.moves.splice(move_num,1); // remove the move on last use
            }
            this.useMoveText(move);
            await this.sleep(1.25);
            var result = move.action();
            if (result.success) {
              this.hitText(this.game_state.players[0]);
              this.sendDamage(result, this.game_state.players[0]);
            } else {
              this.missText();
            }
            await this.sleep(1.25);
            this.game_state.players[0].activateTurn();
          }
      }
    };

    this.game_state.refresh_choices();
  }
  ngOnInit() {}



  // player =
  //
  //
  //
  // opponent_extra = {
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
