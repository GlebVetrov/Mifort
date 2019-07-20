import { Component, Input, Output, EventEmitter,
  OnInit,
  DoCheck,
  OnChanges,
 AfterContentInit,
 AfterContentChecked,
 AfterViewChecked,
 AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent implements OnInit,
DoCheck,
OnChanges,
AfterContentInit,
AfterContentChecked,
AfterViewChecked,
AfterViewInit {

  private counter = 0;

  @Input()
  private name: string;

  @Input()
  private color: string;

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

  private log(msg: string) {
    console.log ( '%c%s', `color: ${this.color}`, msg );
  }
  ngOnInit() {
    this.log(`ngOnInit`);
  }
  ngOnChanges() {
    this.log(`OnChanges`);
  }
  ngDoCheck() {
    this.log(`ngDoCheck`);
  }
  ngAfterViewInit() {
    this.log(`ngAfterViewInit`);
  }
  ngAfterViewChecked() {
    this.log(`ngAfterViewChecked`);
  }
  ngAfterContentInit() {
    this.log(`ngAfterContentInit`);
  }
  ngAfterContentChecked() {
    this.log(`ngAfterContentChecked`);
  }

}
