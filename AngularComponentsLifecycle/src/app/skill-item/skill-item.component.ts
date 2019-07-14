import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent {

  private _count:number = 0;

  get count():number {
    return this._count;
  };

  set count(count:number) {
    this._count += count;
  };

  
}
