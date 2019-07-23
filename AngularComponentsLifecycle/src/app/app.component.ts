import { Component,
  OnInit,
  DoCheck,
  OnChanges,
 AfterContentInit,
 AfterContentChecked,
 AfterViewChecked,
 AfterViewInit } from '@angular/core';

import { ConsoleLogService } from './console-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConsoleLogService]
})
export class AppComponent implements OnInit,
DoCheck,
OnChanges,
AfterContentInit,
AfterContentChecked,
AfterViewChecked,
AfterViewInit {
  private totalCounter = 0;
  public name: string = null;
  public colors: string[] = ['blue', 'orange', 'aqua'];

  constructor(private consoleLogService: ConsoleLogService) {}

  get count(): number {
    return this.totalCounter;
  }

  set count(count: number) {
    this.totalCounter += count;
  }

  ngOnInit() {
    this.consoleLogService.write(`ngOnInit`);
  }
  ngOnChanges() {
    this.consoleLogService.write(`OnChanges`);
  }
  ngDoCheck() {
    this.consoleLogService.write(`ngDoCheck`);
  }
  ngAfterViewInit() {
    this.consoleLogService.write(`ngAfterViewInit`);
  }
  ngAfterViewChecked() {
    this.consoleLogService.write(`ngAfterViewChecked`);
  }
  ngAfterContentInit() {
    this.consoleLogService.write(`ngAfterContentInit`);
  }
  ngAfterContentChecked() {
    this.consoleLogService.write(`ngAfterContentChecked`);
  }
}
