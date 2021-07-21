import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Project-FrontEnd-NLU';
    url = "ws://203.113.148.132:23023/chat/chat";
    ws: any;
    chat : any = document.getElementById("chat");
    user : any = document.getElementById("user");
    jsonObject = {
        "action": "onchat",
        "data": {
            "event": "",
            "data": {},
        }
    }

    init = () => {
        if (this.ws) {
            this.ws.onerror = this.ws.onopen = this.ws.onclose = null;
            this.ws.close();
        }

        this.ws = new WebSocket(this.url);

        this.ws.onopen = alert("Connect successfully");
        this.ws.onmessage = (message: any) => this.receiveMessage(message);
        this.ws.onclose = () => {
            this.ws = null;
            alert("Disconnected!!!");
        }
    }

    connect = () => {
        this.ws ? this.init() : alert("You're already connected");
    }

    disconnect = () => {
        if (this.ws) {
            if (confirm("Do you really want to disconnect?")) {
                this.ws.close();
                return;
            }
        }

        if (confirm("You're not connected.\nDo you want to connect?")) {
            this.connect();
        }
    }

    register = () => {
        if (!this.ws) {
            alert("You are not connected.");
            return;
        }
        let username : any = document.getElementById("userRegister");
        let password : any = document.getElementById("passRegister");
        this.jsonObject.data.event = "REGISTER";
        this.jsonObject.data.data = {
            "user": username.value,
            "pass": password.value
        };
        this.ws.send(JSON.stringify(this.jsonObject));
    }

    login = () => {
        if (!this.ws) {
            alert("You are not connected.");
            return;
        }
        let username : any = document.getElementById("userLogin");
        let password : any = document.getElementById("passLogin");
        this.jsonObject.data.event = "LOGIN";
        this.jsonObject.data.data = {
            "user": username.value,
            "pass": password.value
        };
        this.ws.send(JSON.stringify(this.jsonObject));
        this.user.innerHTML = username.value;
    }

    logout = () => {
        this.jsonObject.data.event = "LOGOUT";
        this.ws.send(JSON.stringify(this.jsonObject));
    }

    chatToPerson = () => {
        if (!this.ws) {
            alert("You are not connected.");
            return;
        }
        let to : any = document.getElementById("to");
        let message : any = document.getElementById("message");
        this.jsonObject.data.event = "SEND_CHAT";
        this.jsonObject.data.data = {
            "type": "people",
            "to": to.value,
            "mes": message.value
        };
        this.ws.send(JSON.stringify(this.jsonObject));
        // chat.innerHTML += "<span>" + user.innerText + "&emsp;:&emsp;" + message.value + "</span><br>";
    }

    receiveMessage = (message: any) => {
        let receiveMessage = JSON.parse(message.data);
        if (receiveMessage.event == "SEND_CHAT") {
            let data = receiveMessage.data;
            // chat.innerHTML += "<span>" + data.name + "&emsp;:&emsp;" + data.mes + "</span><br>";
        }
    }
}
