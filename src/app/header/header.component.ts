import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private _chatService: ChatService) { }

    ngOnInit(): void { }

    logout = () => this._chatService.logout();
}
