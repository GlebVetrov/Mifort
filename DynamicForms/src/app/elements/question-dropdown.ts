import { QuestionBase } from '../question-base';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: {color: string,  name: string,  selected: boolean}[] = [];

  constructor(options: {} = {}) {
    super(options);
    const key = 'options';
    this.options = options[key] || [];
  }
}
