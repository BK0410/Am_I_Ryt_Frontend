import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Tesseract from 'tesseract.js';
import { LoginConstants } from '../shared/constant';
import { createWorker } from 'tesseract.js';
//import { AnyPlugin } from 'any-plugin';
import { Plugin} from '@capacitor/core';
import{CameraResultType,CameraSource,Camera} from  '@capacitor/camera';
import { Plugins } from 'protractor/built/plugins';
import { from } from 'rxjs';
//const {Camera}=Plugins;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  worker:Tesseract.Worker;
  workerReady=false;
  image="../../assets/icon/test.png"
  ocrResult='';
  captureProgress=0;
isText:boolean=true;
isPdf:boolean=false;
isVideo:boolean=false;
isScan:boolean=false;

  constructor(private router: Router) { 
    this.loadWorker();
  }

  ngOnInit() {
   
  }
  
  changetoTextbox()
  {
    this.isText=true;
    this.isPdf=false;
    this.isScan=false;
    this.isVideo=false;
  }
  changetoPdfbox()
  {
    this.isText=false;
    this.isPdf=true;
    this.isScan=false;
    this.isVideo=false;
  }
  changetoScanbox()
  {
    this.isText=false;
    this.isPdf=false;
    this.isScan=true;
    this.isVideo=false;
  }
  changetoVideobox()
  {
    this.isText=false;
    this.isPdf=false;
    this.isScan=false;
    this.isVideo=true;
  }
  routetoQuestionspage(): void {
    this.router.navigate(['question']).then(()=>{
      window.location.reload();
   });
  }
  async loadWorker(){
    this.worker=createWorker({
      logger:progress =>{
        console.log("progress")
        if(progress.status=='recognizing text')
        {this.captureProgress==parseInt(''+ progress.progress*100)
      }
      }
    });
    console.log("inside loadworker")
    await this.worker.load();
    console.log("out loadworker")
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    console.log('Fin');
    this.workerReady=true;

  }
  async captureImage(){
    const image=await Camera.getPhoto({
      quality:90,
      allowEditing:true,
      resultType:CameraResultType.DataUrl,
      source:CameraSource.Camera
    })
    console.log('image ',image)
    this.image=image.dataUrl;
  }
  async recognizeImage(){
    const result=await this.worker.recognize(this.image)
    console.log(result);
    this.ocrResult=result.data.text
  }
  logo=LoginConstants.imgPath.logo;
}
