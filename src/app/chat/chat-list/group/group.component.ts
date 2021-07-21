import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'group-chat',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  groupList: any = [
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
    },
  ];
}
