import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-list',
  templateUrl: './addModList.component.html',
  styleUrls: ['./addModList.component.css']
})
export class AddModListComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  addModList = [
    {
      text: "I am the first addition",
      subtitle: "Details",
      button: "" // anything JS evals to false will work for ngIf
    },
    {
      text: "I am the second addition",
      subtitle: null,
      button: true
    }
  ];
}
