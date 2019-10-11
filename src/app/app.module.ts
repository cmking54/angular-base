import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // ngmodule marks modules

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/rootMod/app.component'; // no ext
// import { AdditionalComponent } from './components/addMod/add.component'; // to add another module
// import { AddModListComponent } from './components/addModList/addModList.component';
import { HighlightDirective } from './directives/highlight.directive';

import { DSComponent } from './components/DS/ds.component';
import { DSTopComponent } from './components/dsTop/dsTop.component';
import { DSBottomComponent } from './components/dsBottom/dsBottom.component';
import { MoveCardComponent } from './components/moveCard/moveCard.component';

import { ImageNamePipe } from './pipes/toImageName.pipe';

import { FormsModule } from '@angular/forms';
import { PokeSelectFormComponent } from './components/pokeSelectForm/pokeSelectForm.component';
import { PokeChoiceComponent } from './components/pokeChoice/pokeChoice.component';
@NgModule({ // not a statement; but a descriptor
  declarations: [ // bring in components, directives, and pipes not from another module
    AppComponent,
    // AdditionalComponent,
    // AddModListComponent,
    ImageNamePipe,
    HighlightDirective,
    DSComponent, DSTopComponent, DSBottomComponent, MoveCardComponent,
    PokeSelectFormComponent, PokeChoiceComponent
  ],
  imports: [ // bring in other modules that are needed
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] // mark the starting point for the bootstrap process
})
export class AppModule { }
