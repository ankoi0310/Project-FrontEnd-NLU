import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }

    join() {
        AppComponent.join();
    }

    leave() {
        AppComponent.leave();
    }
}
