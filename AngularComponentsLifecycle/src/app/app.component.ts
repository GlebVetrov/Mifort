import { Component,
  OnInit,
  DoCheck,
  OnChanges,
 AfterContentInit,
 AfterContentChecked,
 AfterViewChecked,
 AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

  get count(): number {
    return this.totalCounter;
  }

  set count(count: number) {
    this.totalCounter += count;
  }

  private log(msg: string) {
    console.log ( '%c%s', `color: ${'red'}`, msg );
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
