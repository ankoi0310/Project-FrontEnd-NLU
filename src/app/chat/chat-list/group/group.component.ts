
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../chat.service';
//import * as myGlobals from '../../../globals';
@Component({
    selector: 'group-chat',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css'],
})

export  class GroupComponent implements OnInit {
    
   public nameRoom: any;
   public groupList: any = [];
    constructor(private _chatService: ChatService) {}

    ngOnInit(): void {}

    createRoom = () => {
        //myGlobals.nameRoom = this.nameRoom;
        this._chatService.createRoom({ name: this.nameRoom });
       
     
        if(status == 'error' ){;
        this.groupList.push({
            name: this.nameRoom,
            mes: 'message',
        });
        this.nameRoom = '';
    }
    };
    joinRoom = () => {
        this._chatService.joinRoom({ name: this.nameRoom });

        this.groupList.push({
            name: this.nameRoom,
            mes: 'message',
        });
        this.nameRoom = '';
    };
    
}
