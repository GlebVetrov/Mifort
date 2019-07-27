import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnChanges {

  private counter = 0;

  constructor() {
    setInterval(() => {
      this.counter += 1;
    }, 1000);
  }

  @Input() private value: number;

  incCounter() {
    this.counter += this.value;
  }

  ngOnChanges(changes: {[property: string]: SimpleChange }) {
    for (const key in changes) {
      if (key === 'value') {
        this.counter += changes[key].currentValue;
      }
    }
  }
}
