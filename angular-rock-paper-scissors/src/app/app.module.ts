import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainGameSpaceComponent } from './components/main-game-space/main-game-space.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { EmojiComponent } from './components/emoji/emoji.component';
import { ChoicesComponent } from './components/choices/choices.component';

@NgModule({
  declarations: [
    AppComponent,
    MainGameSpaceComponent,
    PlayButtonComponent,
    EmojiComponent,
    ChoicesComponent
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
