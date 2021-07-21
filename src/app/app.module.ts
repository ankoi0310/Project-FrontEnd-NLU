import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatContentComponent } from './chat/chat-content/chat-content.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './chat/chat-list/group/group.component';
import { PersonalComponent } from './chat/chat-list/personal/personal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatListComponent,
    ChatContentComponent,
    LoginComponent,
    ChatComponent,
    GroupComponent,
    PersonalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
