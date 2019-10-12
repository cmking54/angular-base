import { Move } from './move';

export class Player {
  static readonly type_effectiveness = require('../../../assets/json/type_effec.json');
  readonly name: string;
  img_name: string;
  current_hp: number;
  max_hp: number;
  level: number;
  exp: number;
  health_width: number;
  health_left: number;
  health_start: number;
  health_full_width: number;
  exp_width: number;
  exp_left: number;
  // max_exp: ,
  turn_active: boolean;
  moves: Array<Move>;
  types: Array<string>;
  game_state;
  img_width: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;

  constructor(choice, health_start: number, health_full_width: number, game_state) {
    this.name = choice.name.english;
    this.img_name = choice.name.english.toLowerCase();
    this.current_hp = choice.base.HP;
    this.max_hp = choice.base.HP;
    this.level = 1;
    this.exp = 0;
    this.exp_width = 0;
    this.exp_left = 239;
    this.attack = choice.base.Attack * 5;
    this.defense = choice.base.Defense * 2;
    // console.log("DF: " + Object.keys(choice.base));
    this.sp_attack = choice.base["Sp. Attack"];
    this.sp_defense = choice.base["Sp. Defense"];
    this.speed = choice.Speed;

    this.health_width = 0;
    this.health_start = health_start;
    this.health_full_width = health_full_width;
    this.health_left = health_start + health_full_width; //411 + 111,

    this.types = choice.type;


    this.turn_active = false;
    this.moves = Move.getMoves(this.types);
    // this.opponent = opponent;
    // this.opponents = opponents; // multi-battle
    this.game_state = game_state;
    // this.img_width = 115;
    this.img_width = 111;
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
  sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }
  startMoveText(isPlayer) {
    console.log(isPlayer);
    console.log(this);
    this.game_state.text = "What " + ((isPlayer)?"should ":"will ") + this.name + " do?";
  }
  useMoveText(move:Move) {
    this.game_state.text = this.name + " used " + move.name + ".";
  }
  hitText(opponent) {
    this.game_state.text = this.name + " hit " + opponent.name + ".";
  }
  missText() {
    this.game_state.text = this.name + " missed.";
  }
  moveEffectText(move_type, opponent_types) {
    let effect = Player.moveEffectiveness(move_type, opponent_types);
    // console.log(effect);
    if (effect <= 0.5) {
      this.game_state.text = "It was not effective."
    } else if (effect >= 2) {
      this.game_state.text = "It was SUPER effective."
    } else if (effect == 0) {
      this.game_state.text = "It did nothing."
    }
  }
  activateTurn() {
    if (this.game_state.battle_started) {
      this.turn_active = true;
      this.startMoveText(true);
    }
  }
  applyDamage(damage) {
      console.log("Op: " + this.current_hp + " Dam: " + damage);
      this.current_hp -= damage;
      if (!this.isActive()) {
        this.health_width = this.health_full_width;
        this.health_left = this.health_start;
        this.current_hp = 0;
        console.log(this.name + " Fainted");
        this.onFaint();
        return true;
      } else {
        this.health_width = (1 - (this.current_hp / this.max_hp)) * this.health_full_width;
        this.health_left = ((this.current_hp / this.max_hp)) * this.health_full_width + this.health_start;
        return false;
      }
  }
  levelUp(n) {
    this.level += n;
    this.attack = (n/5 + 1) * this.attack;
    this.defense = (n/5 + 1) * this.defense;
    this.sp_attack = (n/5 + 1) * this.sp_attack;
    this.sp_defense = (n/5 + 1) * this.sp_defense;
    this.speed = (n/5 + 1) * this.speed;

    this.current_hp = Math.floor((n/5 + 1) * this.current_hp);
    this.max_hp = Math.floor((n/5 + 1) * this.max_hp);

    if (this.current_hp <= 0.8*this.max_hp) {
      this.current_hp = this.max_hp; //do below
    }
    for (let curr_move of this.moves) {
      if (curr_move.pp_left <= 0.5*curr_move.max_pp) {
        curr_move.pp_left = curr_move.max_pp;
      }
    }
  }
  onFaint() {
    // let position_faint = this.game_state.players.indexOf(this);
    this.imgLeave();
    if (this === this.game_state.players.main) { // main
      this.game_state.text = "Game Over!";
      this.game_state.battle_started = false;
      this.game_state.refresh_choices();
      this.game_state.player_chosen = null;
      this.game_state.players.main = null;
      this.game_state.players.enemy = null;
    } else { // move out and trigger on faint; reload init mapping what's there
      this.game_state.players.main.levelUp(1);
      this.game_state.players.enemy = this.game_state.makePlayer(this.game_state.players.enemy.health_start,this.game_state.players.enemy.health_full_width);
      this.game_state.players.enemy.levelUp(Math.floor(Math.random()*Math.ceil(this.game_state.players.main.level/5)) + this.game_state.players.main.level);
      // console.log();
      this.game_state.players.enemy.perform = async function() {
        // console.log(this);
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
          if (move.hit()) {
            // console.log(this);
            this.hitText(this.game_state.players.main); // change to multi-target
            await this.sleep(0.5);
            this.moveEffectText(move.type, this.game_state.players.main.types);
            await this.sleep(1);
            if (this.sendDamage(move, this.game_state.players.main)) {
              return; // fainted main
            }
          } else {
            this.missText();
          }
          await this.sleep(1.25);
          this.game_state.players.main.activateTurn();
          // this.game_state.players[0].activateTurn();
        }
        this.game_state.players.main.activateTurn();
    }
  }
      // this.game_state.players.main.activateTurn();
  async imgLeave() {
    let frames = 10;
    let shrink_size = (1/frames)*this.img_width;
    for (let i = 0; i < frames; i++) {
      this.img_width -= shrink_size;
      await this.sleep(0.1);
    }
  }
  static moveEffectiveness(move_type, opponent_types) {
    let result = 1;
    // console.log(this.type_effectiveness);
    for (let type_effect of this.type_effectiveness) {
      if (opponent_types.includes(type_effect.name)) {
        if (type_effect.immunes.includes(move_type)) {
          console.log(move_type + " on " + type_effect.name);
          result *= 0;
        } else if (type_effect.strengths.includes(move_type)) {
          result *= 0.5;
        } else if (type_effect.weaknesses.includes(move_type)) {
          result *= 2;
          console.log(move_type + " <> " + opponent_types);
        }
      }
    }
    return result; // add effectiveness code later
  }
}
