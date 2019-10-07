import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // ngmodule marks modules

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component'; // no ext
import { AdditionalComponent } from './additionalModule/add.component'; // to add another module
import { AddModListComponent } from './addModList/addModList.component';

@NgModule({ // not a statement; but a descriptor
  declarations: [ // bring in components, directives, and pipes not from another module
    AppComponent,
    AdditionalComponent,
    AddModListComponent
  ],
  imports: [ // bring in other modules that are needed
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // mark the starting point for the bootstrap process
})
export class AppModule { }
