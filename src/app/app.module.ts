import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // ngmodule marks modules

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/rootMod/app.component'; // no ext
// import { AdditionalComponent } from './components/addMod/add.component'; // to add another module
// import { AddModListComponent } from './components/addModList/addModList.component';
// import { HighlightDirective } from './directives/highlight.directive';

import { DSComponent } from './components/DS/ds.component';
import { DSTopComponent } from './components/dsTop/dsTop.component';
import { DSBottomComponent } from './components/dsBottom/dsBottom.component';

@NgModule({ // not a statement; but a descriptor
  declarations: [ // bring in components, directives, and pipes not from another module
    AppComponent,
    // AdditionalComponent,
    // AddModListComponent,
    // HighlightDirective
    DSComponent, DSTopComponent, DSBottomComponent
  ],
  imports: [ // bring in other modules that are needed
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // mark the starting point for the bootstrap process
})
export class AppModule { }
