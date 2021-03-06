import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detect-changes',
  templateUrl: './detect-changes.component.html',
  styleUrls: ['./detect-changes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectChangesComponent implements OnChanges {

  private counter = 0;

  constructor(private cdr: ChangeDetectorRef) {
    setInterval(() => {
      this.counter += 1;
      this.cdr.detectChanges();
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
