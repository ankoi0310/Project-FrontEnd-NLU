import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userLogin: any;
    passLogin: any;
    userRegister: any;
    passRegister: any;
    constructor(private _chatService: ChatService) { }

    ngOnInit(): void { }

    connect = () => {
        this._chatService.connect();
    } 

    register = () => {
		this._chatService.register({ "user": this.userRegister, "pass": this.passRegister });
		this.userRegister = "";
		this.passRegister = "";
    }

    login = () => {
		this._chatService.login({ "user": this.userLogin, "pass": this.passLogin });
		this.userLogin = "";
		this.passLogin = "";
    }  
}
