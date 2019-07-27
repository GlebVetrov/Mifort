import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { OnPushTimerComponent } from './on-push-timer/on-push-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    OnPushTimerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
