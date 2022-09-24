import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPageRoutingModule } from './question-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuestionPage } from './question.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    QuestionPageRoutingModule
  ],
  declarations: [QuestionPage]
})
export class QuestionPageModule {}
