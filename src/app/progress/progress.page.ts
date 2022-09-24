import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  correct_answers = localStorage.getItem('correct_answers');
  wrong_answers = localStorage.getItem('wrong_answers');
  total_questions: number =
    Number(this.correct_answers) + Number(this.wrong_answers);
  percentage: any = (Number(this.correct_answers) / this.total_questions) * 100;
  constructor() {}

  ngOnInit() {}
}
