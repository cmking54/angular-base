import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GameStateService } from '../../services/gameState.service';

@Component({
  selector: 'pk-select-form',
  templateUrl: 'pokeSelectForm.component.html',
  styleUrls: ['pokeSelectForm.component.css'],
  providers: [GameStateService, FormBuilder]
})
export class PokeSelectFormComponent implements OnInit {
  form: FormGroup;
  // gameState;
  // formBuilder;
  // @Inject(Formbuilder) @Inject(GameStateService)
  // constructor(private gameState: GameStateService, private formBulider: FormBuilder) {
    // this.formBuilder = formBuilder;
    // this.gameState = gameState;
    // console.log(this.gameState);
      // console.log(forSmBuilder);

    // }
  @Input() gameState;
  ngOnChanges(changes) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      // console.log(propName + ": " + changedProp);
      if (propName === "gameState") {
        this.gameState = changedProp.currentValue;
        // console.log("Me");
        // this.gameState.refresh_choices();
      }
    }
  }
  refresh_choices() {
    // console.log(this.form);
    this.form.value.pokeSelect = null;
    this.gameState.refresh_choices();
  }
  onSubmit(pokeSelectForm) {
    // console.log(pokeSelectForm);
    // console.log(pokeSelectForm.pokeSelect.valid);
    let chosen_name = pokeSelectForm.pokeSelect;
    for (let player of this.gameState.starter_choices) {
      if (player.name === chosen_name) {
        this.gameState.player_chosen = player;
        this.gameState.load_init();
        return;
      }
    }
  }
  ngOnInit() {
    // console.log(this.gameState);
    // console.log(this.formBuilder);
    this.form = new FormGroup({ // change back to formBuilder
      pokeSelect: new FormControl("", Validators.compose([
        Validators.required,
        this.selectValidator
      ]))
    });
  }
  selectValidator(control: FormControl) {
    if (control.value.trim().length === 0) {
      return null;
    }
  }
}
