import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { OnPushTimerComponent } from './on-push-timer/on-push-timer.component';
import { DetectChangesComponent } from './detect-changes/detect-changes.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    OnPushTimerComponent,
    DetectChangesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
