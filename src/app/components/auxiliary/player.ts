import { Move } from './move';

export class Player {
  readonly name: string;
  img_name: string;
  current_hp: number;
  readonly max_hp: number;
  level: number;
  exp: number;
  health_width: number;
  health_left: number;
  health_start: number;
  health_full_width: number;
  exp_width: number;
  // exp_left: 239,
  // max_exp: ,
  turn_active: boolean;
  moves: Array<Move>;
  types: Array<string>;
  game_state;
  img_width: number;

  constructor(choice, health_start: number, health_full_width: number, game_state) {
    this.name = choice.name.english;
    this.img_name = choice.name.english.toLowerCase();
    this.current_hp = choice.base.HP * 10;
    this.max_hp = choice.base.HP * 10;
    this.level = 10;
    this.exp = 0;
    this.health_width = 0;
    this.health_start = health_start;
    this.health_full_width = health_full_width;
    this.health_left = health_start + health_full_width; //411 + 111,
    this.exp_width = 0;
    this.types = choice.type;
    // exp_left: 239,
    // max_exp: ,
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

  sendDamage(damage, opponent) {
    opponent.applyDamage(damage);
  }
  sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }
  startMoveText(isPlayer) {
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
  activateTurn() {
    if (this.game_state.battle_started) {
      this.turn_active = true;
      this.startMoveText(true);
    }
  }
  applyDamage(damage) {
      // need type checked for effectiveness
      this.current_hp -= damage.amount;
      if (!this.isActive()) {
        this.health_width = this.health_full_width;
        this.health_left = this.health_start;
        this.current_hp = 0;
        console.log(this.name + " Fainted");
        this.onFaint();
      } else {
        this.health_width = (1 - (this.current_hp / this.max_hp)) * this.health_full_width;
        this.health_left = ((this.current_hp / this.max_hp)) * this.health_full_width + this.health_start;
      }
      return this.current_hp;
  }
  onFaint() {
    let position_faint = this.game_state.players.indexOf(this);
    this.imgLeave();
    if (position_faint == 0) { // main
      this.game_state.text = "Game Over!";
      this.game_state.battle_started = false;
    } else {
      let player_faint = this.game_state.players[position_faint];
      this.game_state.players[position_faint] = this.game_state.makePlayer(player_faint.health_start,player_faint.health_full_width);
      this.game_state.players[position_faint].perform = async function(move) {
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
  }
  async imgLeave() {
    let frames = 10;
    let shrink_size = (1/frames)*this.img_width;
    for (let i = 0; i < frames; i++) {
      this.img_width -= shrink_size;
      await this.sleep(0.1);
    }
  }
}
