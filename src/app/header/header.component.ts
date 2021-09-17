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

    logout = () => {
        // let peopleList = document.getElementById('peopleList');
        // let groupList = document.getElementById('groupList');
        // if (peopleList && groupList) {
        //     peopleList.innerHTML = "";
        //     groupList.innerHTML = "";
        // }
        this._chatService.logout();
    }
}
