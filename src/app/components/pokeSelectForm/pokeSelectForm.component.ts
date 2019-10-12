import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'pk-select-form',
  templateUrl: 'pokeSelectForm.component.html',
  styleUrls: ['pokeSelectForm.component.css']
})
export class PokeSelectFormComponent implements OnInit {
  @Input() game_state;
  ngOnChanges(changes) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      // console.log(propName + ": " + changedProp);
      if (propName === "game_state") {
        this.game_state = changedProp.currentValue;
        // console.log("Me");
        // this.game_state.refresh_choices();
      }
    }
  }
  onSubmit(pokeSelectForm) {
    console.log(pokeSelectForm);
    // console.log(pokeSelectForm.pokeSelect.valid);
    let chosen_name = pokeSelectForm.pokeSelect;
    for (let player of this.game_state.starter_choices) {
      if (player.name === chosen_name) {
        this.game_state.player_chosen = player;
        this.game_state.load_init();
      }
    }
  }
  form: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      pokeSelect: this.formBuilder.control("", Validators.compose([
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
  constructor(private formBuilder: FormBuilder) {}
}
