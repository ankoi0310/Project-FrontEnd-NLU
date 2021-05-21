import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatContentComponent } from './chat-content/chat-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatListComponent,
    ChatContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
