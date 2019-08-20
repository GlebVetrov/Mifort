import { Injectable } from '@angular/core';

import { DropdownQuestion } from './elements/question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './elements/question-textbox';


@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {

    const questions: QuestionBase<any>[] = [

      new DropdownQuestion({
        key: 'brave',
        options: [
          {color: 'red', name: 'Mifort'},
          {color: 'green', name: 'Great'},
          {color: 'yellow', name: 'Good'},
          {color: 'orange', name: 'Unproven'}
        ],
        placeholder: 'Mifort Angular',
        color: 'purple',
        order: 6,
        icon: 'calendar_today'
      }),

      new TextboxQuestion({
        key: 'time',
        placeholder: '23 апр 2019 - 23 июн 2019',
        required: false,
        order: 1,
        icon: 'access_time'
      }),

      new TextboxQuestion({
        key: 'guests',
        placeholder: 'Добавте гостей',
        required: false,
        order: 2,
        icon: 'people'
      }),

      new TextboxQuestion({
        key: 'location',
        placeholder: 'Укажите место проведения',
        required: false,
        order: 3,
        icon: 'location_on',
        color: 'rgba(0, 0, 0, 0.1)'
      }),

      new TextboxQuestion({
        key: 'video',
        placeholder: 'Добавить видео конференцию',
        required: false,
        order: 4,
        icon: 'videocam'
      }),

      new TextboxQuestion({
        key: 'description',
        placeholder: 'Добавить описание',
        required: false,
        order: 5,
        icon: 'subject'
      }),
  ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
