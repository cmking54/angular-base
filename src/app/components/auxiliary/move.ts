export class Move {
  private static readonly all_moves  = require('../../../assets/json/moves.json');;
  static readonly MAX_MOVES = 4; // for each pokemon

  name: string;
  type: string;
  pp_left: number;
  max_pp: number;
  accuracy: number;
  power: number;
  isHighlighted: boolean;

  constructor(json) {
    this.name = json.ename;
    this.type = json.type;
    this.pp_left = json.pp;
    this.max_pp = json.pp;
    this.accuracy = json.accuracy;
    this.power = json.power;
    this.isHighlighted = false;
  }
  hit() {
    // console.log(this.name + " performed.");
    this.pp_left--;
    if (Math.floor(Math.random()*100) < this.accuracy) {
      return true;
    } else {
      return false;
    }
  }

  static getMoves(types:Array<string>):Array<Move> {
    let moves = [];
    if (types.includes("Flying")) {
      types.splice(types.indexOf("Flying"),1);
      // console.log("Flying not supported in moves");
    }
    let max_moves = this.MAX_MOVES;
    for (let n = 0; n < types.length; n++) {
      let amount;
      if (n == types.length - 1) {
        amount = max_moves;
      } else {
        amount = Math.floor(Math.random()*max_moves);
        max_moves -= amount;
      }

      let typed_moves = this.typeFilterMoves(types[n]);
      for (let times = 0; times < amount; times++) {
        let rand_move_json = typed_moves[Math.floor(Math.random()*typed_moves.length)];
        moves.push(new Move(rand_move_json));
      }
    }
    return moves;
  }

  private static typeFilterMoves(type:string) {
    let typed_moves = [];
    for (const move of this.all_moves) {
      if (move.type === type && move.power != null) {
        typed_moves.push(move);
      }
    }
    return typed_moves;
  }
}
