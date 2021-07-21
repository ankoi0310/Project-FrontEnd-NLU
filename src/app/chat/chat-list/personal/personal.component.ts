import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'personal-chat',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  personalList: any[] = [
    {
      "name": "a",
      "mes": "message",
    },
    {
      "name": "b",
      "mes": "message",
    },
    {
      "name": "c",
      "mes": "message",
    },
    {
      "name": "d",
      "mes": "message",
    }
  ];
}
