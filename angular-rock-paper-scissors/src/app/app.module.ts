import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { EmojiComponent } from './components/emoji/emoji.component';
import { ChoicesComponent } from './components/choices/choices.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayButtonComponent,
    EmojiComponent,
    ChoicesComponent,
    MessageListComponent,
    JoinRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
