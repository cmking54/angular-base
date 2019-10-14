import { Player } from '../components/auxiliary/player';
import { MainPlayer } from '../components/auxiliary/mainPlayer';
import { NPC } from '../components/auxiliary/npcPlayer';
import { TurnOrder } from '../components/auxiliary/turnOrder';


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // will be provided for all
})
export class GameStateService {
  static readonly pokedex = require('../../assets/json/pokedex.json');
  players;
  player_chosen: Player;
  main; // hooks for 1 v 1
  enemy; // hooks for 1 v 1
  text: string;
  refreshs: number;
  battle_started: boolean;
  starter_choices;
  static MAIN_HEALTH_START = 411;
  static ENEMY_HEALTH_START = 128;
  static HEALTH_WIDTH = 111;
  speed_coeff: number;
  constructor() {
    this.players = new TurnOrder(2, this); // 2 for 1v1; increase for multi
    this.player_chosen = null;
    this.text = "Waiting for Battle to Start";
    this.refreshs = 4; // amount + 1 for setup
    this.battle_started = false;
    this.starter_choices = [];
    this.refresh_choices();
    this.speed_coeff = 1;
  }
  start() {
    this.battle_started = true;
    this.players.next();
  }
  makePlayer() {
    return new Player(this, null, this.random_item(GameStateService.pokedex));
  }
  // makeMain(start:number, width:number): MainPlayer;
  // makeMain(start:number, width:number, player:Player): MainPlayer;
  makeMain(player?:Player): MainPlayer {
    return new MainPlayer(this, player, this.random_item(GameStateService.pokedex));
  }
  //  {
  //   return new MainPlayer(this.random_item(GameStateService.pokedex), start, width);
  // }
  // makeNPC(start:number, width:number): NPC;
  // makeNPC(start:number, width:number, player:Player): NPC;
  makeNPC(player?:Player): NPC {
    return new NPC(this, player, this.random_item(GameStateService.pokedex));
  }
  // makeNPC(start:number, width:number) {
  //   return new NPC(this.random_item(GameStateService.pokedex), start, width);
  // }
  // makeNPC(start:number, width:number) {
  //   return new NPC(this.random_item(GameStateService.pokedex), start, width);
  // }
  getRandomBounded(n:number):number {
    return Math.floor(Math.random()*n);
  }
  random_item(items) {
    var n = this.getRandomBounded(items.length);
    return items[n];
  }
  refresh_choices() {
    this.starter_choices = [];
    let choice_num = 3;
    for (let i = 0; i < choice_num; i++) {
      this.starter_choices.push(this.makePlayer());
    }
    this.refreshs--;
  }
  load_init() {
    if (this.player_chosen) {
      // player_chosen -> player
      // player_chosen => add to queue with predefined data
      this.main = this.makeNPC(this.player_chosen);
      this.players.add(this.main);
    }

    //enemy validation
    this.enemy = this.makeNPC();
    this.players.add(this.enemy);
    // let main = this.player_chosen; // main player
    // let enemy = this.makePlayer(128,111); // first opponent
    // console.log(player);
  }
  sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000 / this.speed_coeff));
  }
  slowDown() {
    this.speed_coeff *= 0.1;
  }
  speedUp() {
    this.speed_coeff *= 1.1;
  }
}
