import { Component, Input, Output, EventEmitter,
  OnInit,
  DoCheck,
  OnChanges,
 AfterContentInit,
 AfterContentChecked,
 AfterViewChecked,
 AfterViewInit } from '@angular/core';

import { ConsoleLogService } from '../console-log.service';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss'],
  providers: [ConsoleLogService]
})
export class SkillItemComponent implements OnInit,
DoCheck,
OnChanges,
AfterContentInit,
AfterContentChecked,
AfterViewChecked,
AfterViewInit {

  constructor(private consoleLogService: ConsoleLogService) {}

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

  ngOnInit() {
    this.consoleLogService.write(`ngOnInit`, this.color);
  }
  ngOnChanges() {
    this.consoleLogService.write(`OnChanges`, this.color);
  }
  ngDoCheck() {
    this.consoleLogService.write(`ngDoCheck`, this.color);
  }
  ngAfterViewInit() {
    this.consoleLogService.write(`ngAfterViewInit`, this.color);
  }
  ngAfterViewChecked() {
    this.consoleLogService.write(`ngAfterViewChecked`, this.color);
  }
  ngAfterContentInit() {
    this.consoleLogService.write(`ngAfterContentInit`, this.color);
  }
  ngAfterContentChecked() {
    this.consoleLogService.write(`ngAfterContentChecked`, this.color);
  }

}
