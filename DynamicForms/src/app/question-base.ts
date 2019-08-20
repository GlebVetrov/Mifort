export class QuestionBase<T> {
  value: T;
  key: string;
  required: boolean;
  order: number;
  controlType: string;
  placeholder: string;
  icon: string;
  color: string;
  options: {color: string,  name: string,  selected: boolean}[];

  constructor(options: {
    value?: T,
    key?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    placeholder?: string,
    icon?: string,
    color?: string
    options?: {color: string,  name: string,  selected: boolean}[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.placeholder = options.placeholder || '';
    this.icon = options.icon || '';
    this.color = options.color || 'transparent';
  }
}
