import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
@Component({
	selector: 'app-chat-content',
	templateUrl: './chat-content.component.html',
	styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {
	to: any;
	message: any
	chatHistory: any[] = [];

	constructor(private _chatService: ChatService) {
		this.chatHistory = this._chatService.chatHistory;
	}

	ngOnInit(): void { }

	sendMessage = () => {
		this._chatService.chatToPeople(this.message);
		this.message = '';
	}
}
