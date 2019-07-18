import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  totalCounter = 0;
  public name: string = null;

  get count(): number {
    return this.totalCounter;
  }

  set count(count: number) {
    this.totalCounter += count;
  }
}
