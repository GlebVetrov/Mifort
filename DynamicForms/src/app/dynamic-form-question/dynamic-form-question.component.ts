import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent {
  options = {};

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.question.key].valid; }
}
