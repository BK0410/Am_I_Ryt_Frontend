import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { VoiceRecognitionService } from '../services/VoiceRecognition/voice-recognition.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  micOn: boolean = false;
  answerToQues = '';
  correct_answers: number = 0;
  wrong_answers: number = 0;
  total_questions: number = 0;
  correct_responses = {};
  wrong_responses = {};
  noQuestions: boolean = false;
  i = 0;
  questions = [];
  answers = [];
  questAns = {
    'What is the capital of Tamil Nadu?': 'Chennai',
    'Which is the capital of India?': 'New Delhi',
    'Where is Gateway of India located?': 'Mumbai',
  };
  constructor(
    private textToSpeech: TextToSpeech,
    private router: Router,
    private speechToTextService: VoiceRecognitionService
  ) {}

  ngOnInit() {
    for (const key in this.questAns) {
      this.questions.push(key);
      this.answers.push(this.questAns[key]);
    }

    this.total_questions = this.questions.length;
  }

  startService() {
    this.micOn = true;
    this.speechToTextService.start();
  }

  stopService() {
    this.micOn = false;
    this.speechToTextService.stop();
    // this.service.text = '';
  }

  convertTextToSpeech(text) {
    this.textToSpeech
      .speak({
        text: text,
        locale: 'en-GB',
        rate: 0.75,
      })
      .then(() => console.log('Done'))
      .catch((reason: any) => console.log(reason));
  }

  checkAnswer(question) {
    this.i = this.i + 1;

    if (
      this.answerToQues.toLowerCase() == this.questAns[question].toLowerCase()
    ) {
      this.correct_answers = this.correct_answers + 1;
      this.correct_responses[question] = this.answerToQues;
    } else {
      this.wrong_answers = this.wrong_answers + 1;
      this.wrong_responses[question] = this.answerToQues;
    }
    if (this.i >= this.questions.length) {
      console.log(this.correct_responses);
      console.log(this.wrong_responses);
      localStorage.setItem('correct_answers', this.correct_answers.toString());
      localStorage.setItem('wrong_answers', this.wrong_answers.toString());
      this.noQuestions = true;
      this.router.navigate(['progress']);
    }
    this.answerToQues = '';
  }
}
