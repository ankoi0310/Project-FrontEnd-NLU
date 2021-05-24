import { Component, OnInit } from '@angular/core';
import 'ws/';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    ws: any;

    constructor() { }

    ngOnInit(): void {
        this.init();
    }

    init() {
        if (this.ws) {
            this.ws.onerror = this.ws.onopen = this.ws.onclose = null;
            this.ws.close();
        }

        this.ws = new WebSocket('ws://localhost:2001');
        this.ws.onopen = () => {
            console.log('Connection opened!');
        }

        this.ws.message = (data: any) => this.showMessage(data);

        this.ws.onclose = () => this.ws = null;
    }

    join() {
        if (!this.ws) {
            alert("You are connected!");
            this.init();
            return;
        }
        alert("You already have a Web Socket connection");
    }

    leave() {
        if (!this.ws) {
            alert("No Web Socket connection!");
            return;
        }

        if (confirm("Do you wanna leave?")) {
            this.ws.close();
            alert("No Web Socket connection!");
        }
    }

    showMessage(data: any) {

    }

}
