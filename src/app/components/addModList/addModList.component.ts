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
      button: "", // anything JS evals to false will work for ngIf
      fontColor: 'Blue',
      isHighlighted: null
    },
    {
      text: "I am the second addition",
      subtitle: "Subbed Title",
      button: true,
      fontColor: 'Red',
      isHighlighted: null
    }
  ];
}
