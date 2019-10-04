import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // ngmodule marks modules

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // no ext

@NgModule({ // not a statement; but a descriptor
  declarations: [ // bring in components, directives, and pipes not from another module
    AppComponent
  ],
  imports: [ // bring in other modules that are needed
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // mark the starting point for the bootstrap process
})
export class AppModule { }
