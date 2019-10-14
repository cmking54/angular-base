import { Move } from './move';
import { GameStateService } from '../../services/gameState.service';

export class Player {
  static readonly type_effectiveness = require('../../../assets/json/type_effec.json');
  readonly name: string;
  img_name: string;
  current_hp: number;
  max_hp: number;
  level: number;
  exp: number;
  // health_width: number;
  // health_left: number;
  // health_start: number;
  // health_full_width: number;
  exp_width: number;
  exp_left: number;
  // max_exp: ,
  // turn_active: boolean;
  moves: Array<Move>;
  types: Array<string>;
  // game_state;
  img_width: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
  gameState: GameStateService;

  constructor(gameState: GameStateService, prev_player?: Player, choice?) {
    if (choice) {
      this.name = choice.name.english;
      this.img_name = choice.name.english.toLowerCase();
      this.current_hp = choice.base.HP;
      this.max_hp = choice.base.HP;
      this.level = 1;
      this.exp = 0;
      this.exp_width = 0;
      this.exp_left = 239;
      this.attack = choice.base.Attack;
      this.defense = choice.base.Defense;
      this.sp_attack = choice.base["Sp. Attack"];
      this.sp_defense = choice.base["Sp. Defense"];
      this.speed = choice.Speed;
      this.types = choice.type;
      this.moves = Move.getMoves(this.types);
    }
    if (prev_player) {
      this.name = prev_player.name;
      this.img_name = prev_player.img_name;
      this.current_hp = prev_player.current_hp;
      this.max_hp = prev_player.max_hp;
      this.level = prev_player.level;
      this.exp = prev_player.exp;
      this.exp_width = prev_player.exp_width;
      this.exp_left = 239;
      this.attack = prev_player.attack;
      this.defense = prev_player.defense;;
      this.sp_attack = prev_player.sp_attack;
      this.sp_defense = prev_player.sp_defense;
      this.speed = prev_player.speed;
      this.types = prev_player.types;
      this.moves = prev_player.moves;
    }


    // this.health_width = 0;
    // this.health_start = health_start;
    // this.health_full_width = health_full_width;
    // this.health_left = health_start + health_full_width; //411 + 111,
    this.img_width = 111;
    this.gameState = gameState;
    // console.log(this);
  };


  isActive() {
    return this.current_hp > 0;
  }

  sendDamage(move, opponent) { // adding damage algo
    let damage = move.power;
    // console.log("D1: " + damage + " " + this.attack/opponent.defense);
    damage *= (this.attack/opponent.defense);
    // console.log("D2: " + damage);
    damage *= (2 * this.level + 10)/5;
    // console.log("D3: " + damage);
    damage /= 50;
    // console.log("D4: " + damage);
    damage += 2;
    // console.log("D5: " + damage);
    damage *= modifier();
    // console.log("D6: " + damage);
    function modifier():number {
      let targets = 1; // 0.75: multitarget
      let weather = 1; // +- 0.5 when weather
      let badge = 1; // +0.25 if badge for move type
      let critical = (Math.random() <= 0.05) ? 2 : 1;
      let random = (Math.random() * (1-0.85)+0.85);
      let effective = Player.moveEffectiveness(move.type, opponent.types);
      let stab = 1.5; // if using same type, 1 if not
      let burn = 1; // 0.5 if burned
      let other = 1;
      return targets * weather * badge * critical * random * effective * stab * burn * other;
    }
    damage = Math.floor(damage);
    return opponent.applyDamage(damage);
  }
  useMoveText(move:Move) {
    this.gameState.text = this.name + " used " + move.name + ".";
  }
  hitText(opponent) {
    this.gameState.text = this.name + " hit " + opponent.name + ".";
  }
  missText() {
    this.gameState.text = this.name + " missed.";
  }
  moveEffectText(move_type, opponent_types) {
    let effect = Player.moveEffectiveness(move_type, opponent_types);
    // console.log(effect);
    if (effect <= 0.5) {
      this.gameState.text = "It was not effective."
    } else if (effect >= 2) {
      this.gameState.text = "It was SUPER effective."
    } else if (effect == 0) {
      this.gameState.text = "It did nothing."
    }
  }

  applyDamage(damage) {
    // console.log("Op: " + this.current_hp + " Dam: " + damage);
    this.current_hp -= damage;
    if (!this.isActive()) {
      //this.health_width = this.health_full_width;
      // this.health_left = this.health_start;
      this.current_hp = 0;
      // console.log(this.name + " Fainted");
      this.onFaint();
      return true;
    } else {
      //this.health_width = (1 - (this.current_hp / this.max_hp)); // * this.health_full_width;
      // this.health_left = ((this.current_hp / this.max_hp));// * this.health_full_width + this.health_start;
      return false;
    }
  }
  getHealthRemaining() {
    return this.current_hp / this.max_hp;
  }
  levelUp(n) { // leveling broken for winner
    this.level += n;
    for (let i = 0; i < n; i++) {
      this.attack = (1/50 + 1) * this.attack;
      this.defense = (1/50 + 1) * this.defense;
      this.sp_attack = (1/50 + 1) * this.sp_attack;
      this.sp_defense = (1/50 + 1) * this.sp_defense;
      this.speed = (1/50 + 1) * this.speed;

      this.current_hp = Math.floor((1/50 + 1) * this.current_hp);
      this.max_hp = Math.floor((1/50 + 1) * this.max_hp);
    }
    if (this.current_hp <= 0.25*this.max_hp) {
      this.current_hp = this.max_hp; //do below
    }
    for (let curr_move of this.moves) {
      if (curr_move.pp_left <= 0.1*curr_move.max_pp) {
        curr_move.pp_left = curr_move.max_pp;
      }
    }
  }
  onFaint() {
    return;
  }
  // async imgLeave() {
  //   let frames = 10;
  //   let shrink_size = (1/frames)*this.img_width;
  //   for (let i = 0; i < frames; i++) {
  //     this.img_width -= shrink_size;
  //     await this.sleep(0.1);
  //   }
  // }
  static moveEffectiveness(move_type, opponent_types) {
    let result = 1;
    // console.log(this.type_effectiveness);
    for (let type_effect of this.type_effectiveness) {
      if (opponent_types.includes(type_effect.name)) {
        if (type_effect.immunes.includes(move_type)) {
          // console.log(move_type + " on " + type_effect.name);
          result *= 0;
        } else if (type_effect.strengths.includes(move_type)) {
          result *= 0.5;
        } else if (type_effect.weaknesses.includes(move_type)) {
          result *= 2;
          // console.log(move_type + " <> " + opponent_types);
        }
      }
    }
    return result; // add effectiveness code later
  }
}
