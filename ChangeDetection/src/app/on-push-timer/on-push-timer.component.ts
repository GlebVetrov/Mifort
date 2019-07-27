import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-on-push-timer',
  templateUrl: './on-push-timer.component.html',
  styleUrls: ['./on-push-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushTimerComponent implements OnChanges {

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
