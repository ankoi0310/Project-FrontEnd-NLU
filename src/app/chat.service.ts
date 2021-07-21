import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
	
export class ChatService {

	private ws: any;
    private jsonObject = {
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

		this.ws = new WebSocket("ws://203.113.148.132:23023/chat/chat");
		
        this.ws.onmessage = (message: any) => this.receiveMessage(message);
        this.ws.onclose = () => {
            this.ws = null;
            // alert("Disconnected!!!");
        }
	}

    connect = () => {
        this.init();
		document.getElementById("loginForm")?.classList.remove("d-none");
		document.getElementById("btnStart")?.classList.add("d-none");
    }

    // disconnect = () => {
    //     if (this.ws) {
    //         if (confirm("Do you really want to disconnect?")) {
    //             this.ws.close();
    //             return;
    //         }
    //     }
    //     if (confirm("You're not connected.\nDo you want to connect?")) {
    //         this.connect();
    //     }
    // }

    register = (data: any) => {
        this.jsonObject.data.event = "REGISTER";
        this.jsonObject.data.data = data;
        this.ws.send(JSON.stringify(this.jsonObject));
    }

	login = (data: any) => {
		this.jsonObject.data.event = "LOGIN";
		this.jsonObject.data.data = data;
		this.ws.send(JSON.stringify(this.jsonObject));
		// this.user.innerHTML = username.value;
    }

    logout = () => {
        this.jsonObject.data.event = "LOGOUT";
        this.ws.send(JSON.stringify(this.jsonObject));
		document.getElementById("header")?.classList.add("d-none");
		document.getElementById("chat")?.classList.add("d-none");
		document.getElementById("loginForm")?.classList.add("d-none");
		document.getElementById("login")?.classList.remove("d-none");
		document.getElementById("btnStart")?.classList.remove("d-none");
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
		
		// Register
		if (receiveMessage.event == "REGISTER") {
			if (receiveMessage.status == "error") {
				alert(receiveMessage.mes);
			} else {
				alert(receiveMessage.data);
			}
		}

        // Login
		if (receiveMessage.event == "LOGIN") {
			if (receiveMessage.status == "error") {
				alert(receiveMessage.mes);
			} else {
				document.getElementById("header")?.classList.remove("d-none");
				document.getElementById("chat")?.classList.remove("d-none");
				document.getElementById("login")?.classList.add("d-none");
				alert(receiveMessage.data);
			}
		}

		// Chat
		if (receiveMessage.event == "SEND_CHAT") {
            let data = receiveMessage.data;
            // chat.innerHTML += "<span>" + data.name + "&emsp;:&emsp;" + data.mes + "</span><br>";
        }
    }
}
