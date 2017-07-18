import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversationPage } from './conversation';

@NgModule({
  declarations: [
    ConversationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversationPage),
  ],
  exports: [
    ConversationPage
  ]
})
export class ConversationPageModule {}
