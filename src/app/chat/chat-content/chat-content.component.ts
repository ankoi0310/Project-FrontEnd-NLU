import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
@Component({
	selector: 'app-chat-content',
	templateUrl: './chat-content.component.html',
	styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {
	chatHistory: any = []
	type: string = ""
	message: any

	constructor(private _chatService: ChatService) {
		this.type = this._chatService.type;
		this.chatHistory = this._chatService.chatHistory;
	}

	ngOnInit(): void { }

	sendMessage = () => {
		let to = document.getElementById('to');
		let name = document.getElementById('user');
		if (to && to.textContent != "") {
			if (this.message != null && this.message != "") {
				if (name) {
					this.chatHistory.push({
						'mes': this.message,
						'name': name.textContent,
						'to': to.textContent,
						'className': 'message send',
					});
				}
				if (this._chatService.type == 'people') {
					this._chatService.chatToPeople({ to: to.textContent, message: this.message });
				} else {
					this._chatService.chatToRoom({ to: to.textContent, message: this.message });
				}
			} else {
				alert('Please type a message');
			}
		} else {
			alert('Please choose a person to send');
		}
		this.message = '';
	}
}
