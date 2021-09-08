import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',

})

export class ChatService {
    groupList: any = [];
    peopleList: any = [];
    chatHistory: any = [];
    type: string = "";
    people: any;
    room: any;
    user: any;
    private ws: any;
    private jsonObject = {
        action: 'onchat',
        data: {
            event: '',
            data: {},
        },
    };

    init = () => {
        if (this.ws) {
            this.ws.onerror = this.ws.onopen = this.ws.onclose = null;
            this.ws.close();
        }

        this.ws = new WebSocket('ws://203.113.148.132:23023/chat/chat');
        this.ws.onmessage = (message: any) => { this.receiveMessage(message); }
        this.ws.onclose = () => { this.ws = null; };
    };

    connect = () => {
        this.init();
        document.getElementById('loginForm')?.classList.remove('d-none');
        document.getElementById('btnStart')?.classList.add('d-none');
    };

    register = (data: any) => {
        this.jsonObject.data.event = 'REGISTER';
        this.jsonObject.data.data = data;
        this.ws.send(JSON.stringify(this.jsonObject));
    };

    login = (data: any) => {
        this.jsonObject.data.event = 'LOGIN';
        this.jsonObject.data.data = data;
        this.ws.send(JSON.stringify(this.jsonObject));
        this.user = data.user;
    };

    logout = () => {
        this.jsonObject.data.event = 'LOGOUT';
        this.ws.send(JSON.stringify(this.jsonObject));
        document.getElementById('header')?.classList.add('d-none');
        document.getElementById('chat')?.classList.add('d-none');
        document.getElementById('loginForm')?.classList.add('d-none');
        document.getElementById('login')?.classList.remove('d-none');
        document.getElementById('btnStart')?.classList.remove('d-none');
    };

    findPeople = (data: any) => {
        this.jsonObject.data.event = 'CHECK_USER';
        this.jsonObject.data.data = data;
        if (data.user == this.user) {
            alert('You are currently logging in');
        } else {
            this.ws.send(JSON.stringify(this.jsonObject));
            this.people = data.user;
        }
    }

    getPeopleChatMessage = (name: any) => {
        this.type = "people";
        this.chatHistory.length = 0;
        this.jsonObject.data.event = 'GET_PEOPLE_CHAT_MES';
        this.jsonObject.data.data = {
            'name': name,
            'page': 1
        };
        this.ws.send(JSON.stringify(this.jsonObject));
        let to = document.getElementById('to');
        if (to) {
            to.innerHTML = name;
        }
    }

    chatToPeople = (data: any) => {
        this.jsonObject.data.event = 'SEND_CHAT';
        this.jsonObject.data.data = {
            'type': 'people',
            'to': data.to,
            'mes': data.message
        };
        this.ws.send(JSON.stringify(this.jsonObject));
    };

    createRoom = (data: any) => {
        this.jsonObject.data.event = 'CREATE_ROOM';
        this.jsonObject.data.data = data;
        this.ws.send(JSON.stringify(this.jsonObject));
        this.room = data.room;
    };

    joinRoom = (data: any) => {
        this.jsonObject.data.event = 'JOIN_ROOM';
        this.jsonObject.data.data = data;
        this.room = data.name;
        this.ws.send(JSON.stringify(this.jsonObject));
    };

    getRoomChatMessage = (name: any) => {
        this.type = "room";
        this.chatHistory.length = 0;
        this.jsonObject.data.event = 'GET_ROOM_CHAT_MES';
        this.jsonObject.data.data = {
            'name': name,
            'page': 1
        };
        this.ws.send(JSON.stringify(this.jsonObject));
        let to = document.getElementById('to');
        if (to) {
            to.innerHTML = name;
        }
    }

    chatToRoom = (data: any) => {
        this.jsonObject.data.event = 'SEND_CHAT';
        this.jsonObject.data.data = {
            'type': 'room',
            'to': data.to,
            'mes': data.message
        };
        this.ws.send(JSON.stringify(this.jsonObject));
    };

   
    receiveMessage = (message: any) => {
        let receiveMessage = JSON.parse(message.data);

        // Register
        if (receiveMessage.event == 'REGISTER') {
            if (receiveMessage.status == 'error') {
                alert(receiveMessage.mes);
            } else {
                alert(receiveMessage.data);
            }
        }

        // Login
        if (receiveMessage.event == 'LOGIN') {
            if (receiveMessage.status == 'error') {
                alert(receiveMessage.mes);
            } else {
                document.getElementById('header')?.classList.remove('d-none');
                document.getElementById('chat')?.classList.remove('d-none');
                document.getElementById('login')?.classList.add('d-none');
                let user = document.getElementById('user');
                if (user) { user.innerHTML = this.user; }
            }
        }

        // Check User
        if (receiveMessage.event == 'CHECK_USER') {
            if (receiveMessage.data.status) {
                if (!this.peopleList.some((people: { name: any; mes: any; }) => people.name == this.people)) {
                    this.peopleList.push({
                        name: this.people,
                        mes: ''
                    });
                }
            }
            else {
                alert('This account is offline or does not exist.');
            }
        }

        // Get People Chat Message
        if (receiveMessage.event == 'GET_PEOPLE_CHAT_MES') {
            let data = receiveMessage.data;
            for (let i = data.length - 1; i >= 0; i--) {
                let className = data[i].name == this.user ? 'message send' : 'message receive';
                this.chatHistory.push({
                    'mes': data[i].mes,
                    'name': data[i].name,
                    'to': data[i].to,
                    'className': className
                })
            }
        }

        // Get Room Chat Message
        if (receiveMessage.event == 'GET_ROOM_CHAT_MES') {
            let data = receiveMessage.data.chatData;
            for (let i = data.length - 1; i >= 0; i--) {
                let className = data[i].name == this.user ? 'message send' : 'message receive';
                this.chatHistory.push({
                    'mes': data[i].mes,
                    'name': data[i].name,
                    'to': data[i].to,
                    'className': className
                })
            }
        }

        // Chat To People, Room
        if (receiveMessage.event == 'SEND_CHAT') {
            let data = receiveMessage.data;
            let to = document.getElementById('to');
            if (to && ((to.textContent == data.to && data.type == 1) || (to.textContent == data.name && data.type == 0))) {
                this.chatHistory.push({
                    'mes': data.mes,
                    'name': data.name,
                    'to': data.to,
                    'className': 'message receive',
                });
            }
        }

        // Create Room
        if (receiveMessage.event == 'CREATE_ROOM') {
            let data = receiveMessage.data;
            if (receiveMessage.status == 'error') {
                alert(receiveMessage.mes);
            } else {
                this.groupList.push({
                    name: data.name,
                    mes: 'message',
                });
            }
        }  

        //Join Room
        if (receiveMessage.event == 'JOIN_ROOM') {
            if (receiveMessage.status == 'success') {
                if (!this.groupList.some((room: { name: any; mes: any; }) => room.name == this.room)) {
                    this.groupList.push({
                        name: this.room,
                        mes: 'message',
                    });
                }
                else {
                    alert('You are already a member of this group.');
                }
            }
        }
    };
}
