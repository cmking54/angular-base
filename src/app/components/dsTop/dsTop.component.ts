import { Component, OnInit, Input, OnChanges} from '@angular/core';
// import { DSComponent } from '../DS/ds.component';

@Component({
  selector: 'ds-top',
  templateUrl: './dsTop.component.html',
  styleUrls: ['./dsTop.component.css'],
  // declarations: [DSComponent]
})
export class DSTopComponent implements OnInit {
  @Input() game_state;
  // player;
  // opponent;
  constructor() {}
  ngOnInit() {}
  ngOnChanges(changes) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      console.log(propName + ": " + changedProp);
      if (propName === "game_state") {
        this.game_state = changedProp;
        // this.player = this.game_state.players[0]; // main
        // this.opponent = this.game_state.players[1];
      }
    }
  }
}
