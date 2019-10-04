import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
      h1 { color: #abcdef; }
    `],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-base';
}
