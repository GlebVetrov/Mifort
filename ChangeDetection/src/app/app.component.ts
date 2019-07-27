import { Component, ViewChild, ElementRef } from '@angular/core';
import {DefaultComponent} from './default/default.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChangeDetection';

  private value = 0;

  @ViewChild('inputText', {static: false}) inputTextRef: ElementRef;

  setValue() {
    const num: number = parseInt(this.inputTextRef.nativeElement.value, 10);
    if (!isNaN(num)) {
      this.value = num;
      this.inputTextRef.nativeElement.value = '';
    }
  }
}
