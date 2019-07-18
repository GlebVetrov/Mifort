import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent {

  private counter = 0;

  @Input()
  private name: string;

  @Output()
  private dec: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  private inc: EventEmitter<void> = new EventEmitter<void>();

  get count(): number {
    return this.counter;
  }

  set count(count: number) {
    this.counter += count;
  }
}
