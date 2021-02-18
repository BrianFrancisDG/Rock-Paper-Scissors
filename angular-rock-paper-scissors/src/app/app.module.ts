import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// SocketIo Imports
import { SocketIoModule } from 'ngx-socket-io'; 
import { SocketIoConfig } from 'ngx-socket-io';

const socketIoConfig: SocketIoConfig = 
{ url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(socketIoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
