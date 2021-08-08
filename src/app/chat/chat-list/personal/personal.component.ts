import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';

@Component({
	selector: 'personal-chat',
	templateUrl: './personal.component.html',
	styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

	username: any;
	peopleList: any[] = [];

	constructor(private _chatService: ChatService) {
		this.peopleList = _chatService.peopleList;
	}

	ngOnInit(): void {
	}

	findPeople = () => {
		if (this.username) {
			this._chatService.findPeople({ "user": this.username });
			this.username = "";
		} else {
			alert('Please enter the name');
		}
	}

	getPeopleChatMessage = (name: any) => {
		this._chatService.getPeopleChatMessage(name);
	}
} 
