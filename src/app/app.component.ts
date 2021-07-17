import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Project-FrontEnd-NLU';

    static ws: any;

    constructor() { }

    ngOnInit(): void {
        AppComponent.ws = AppComponent.init();
    }

    static init() {
        if (this.ws) {
            this.ws.onerror = this.ws.onopen = this.ws.onclose = null;
            this.ws.close();
        }

        this.ws = new WebSocket('ws://203.113.148.132:23023/chat/chat');
        this.ws.onopen = () => {
            console.log('Connection opened!');
        }

        this.ws.message = (data: any) => this.showMessage(data);

        this.ws.onclose = () => this.ws = null;
    }

    static join() {
        if (!this.ws) {
            alert("You are connected!");
            this.init();
            return;
        }
        alert("You already have a Web Socket connection");
    }

    static leave() {
        if (!this.ws) {
            alert("No Web Socket connection!");
            return;
        }

        if (confirm("Do you wanna leave?")) {
            this.ws.close();
            alert("No Web Socket connection!");
        }
    }

    static showMessage(data: any) {

    }
}
