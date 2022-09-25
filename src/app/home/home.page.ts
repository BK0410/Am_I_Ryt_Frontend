import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Tesseract from 'tesseract.js';
import * as aws from 'aws-sdk';
import { LoginConstants } from '../shared/constant';
import { createWorker } from 'tesseract.js';
//import { AnyPlugin } from 'any-plugin';
import { Plugin } from '@capacitor/core';
import { CameraResultType, CameraSource, Camera } from '@capacitor/camera';
import { Plugins } from 'protractor/built/plugins';
import { from } from 'rxjs';
import { VoiceRecognitionService } from '../services/VoiceRecognition/voice-recognition.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { environment } from 'src/environments/environment';
import { UploadService } from '../services/upload/upload.service';
//const {Camera}=Plugins;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  micOn: boolean = false;
  selectedFiles: FileList;
  text: string;
  input_text = [];
  worker: Tesseract.Worker;
  workerReady = false;
  image = '../../assets/icon/test.png';
  ocrResult = '';
  captureProgress = 0;
  isText: boolean = true;
  isPdf: boolean = false;
  isVideo: boolean = false;
  isScan: boolean = false;

  constructor(
    private router: Router,
    public speechToTextService: VoiceRecognitionService,
    private textToSpeech: TextToSpeech,
    private uploadService: UploadService
  ) {
    this.speechToTextService.init();
    this.input_text = [
      'Things are going well so far',
      "That's the last straw",
      'The best of both worlds',
      'The person we were just talking about showed up!',
    ];
    this.loadWorker();
  }

  ngOnInit() {}

  changetoTextbox() {
    this.isText = true;
    this.isPdf = false;
    this.isScan = false;
    this.isVideo = false;
  }
  changetoPdfbox() {
    this.isText = false;
    this.isPdf = true;
    this.isScan = false;
    this.isVideo = false;
  }
  changetoScanbox() {
    this.isText = false;
    this.isPdf = false;
    this.isScan = true;
    this.isVideo = false;
  }
  changetoVideobox() {
    this.isText = false;
    this.isPdf = false;
    this.isScan = false;
    this.isVideo = true;
  }
  routetoQuestionspage(): void {
    this.router.navigate(['question']).then(() => {
      window.location.reload();
    });
  }
  async loadWorker() {
    this.worker = createWorker({
      logger: (progress) => {
        console.log('progress');
        if (progress.status == 'recognizing text') {
          this.captureProgress == parseInt('' + progress.progress * 100);
        }
      },
    });
    console.log('inside loadworker');
    await this.worker.load();
    console.log('out loadworker');
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    console.log('Fin');
    this.workerReady = true;
  }
  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    console.log('image ', image);
    this.image = image.dataUrl;
  }
  async recognizeImage() {
    const result = await this.worker.recognize(this.image);
    console.log(result);
    this.ocrResult = result.data.text;
  }
  logo = LoginConstants.imgPath.logo;

  startService() {
    this.micOn = true;
    this.speechToTextService.start();
  }

  stopService() {
    this.micOn = false;
    this.speechToTextService.stop();
  }

  clearInput() {
    this.speechToTextService.text = '';
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

  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadFile(file);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
