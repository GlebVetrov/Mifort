import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SkillItemComponent } from './skill-item/skill-item.component';
import { NameItemComponent } from './name-item/name-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillItemComponent,
    NameItemComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
