import { Component,
  OnInit,
  DoCheck,
  OnChanges,
 AfterContentInit,
 AfterContentChecked,
 AfterViewChecked,
 AfterViewInit } from '@angular/core';

import { ConsoleLogService } from '../console-log.service';

@Component({
  selector: 'app-name-item',
  templateUrl: './name-item.component.html',
  styleUrls: ['./name-item.component.scss'],
  providers: [ConsoleLogService]
})
export class NameItemComponent implements OnInit,
DoCheck,
OnChanges,
AfterContentInit,
AfterContentChecked,
AfterViewChecked,
AfterViewInit {

  constructor(private consoleLogService: ConsoleLogService) {}

  private color = 'purple';

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
