import { QuestionBase } from '../question-base';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    const key = 'options';
    this.options = options[key] || [];
  }
}
