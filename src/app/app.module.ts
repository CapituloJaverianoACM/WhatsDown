import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { ContactsPage } from '../pages/contacts/contacts';
import { ChatsPage } from '../pages/chats/chats';
import { SettingsPage } from '../pages/settings/settings';
import { ConversationPage } from '../pages/conversation/conversation';
import { TabsPage } from '../pages/tabs/tabs';

import { ErrorMessages } from '../shared/errorMessages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';
import { UserProvider } from '../providers/user/user';
import { ChatProvider } from '../providers/chat/chat';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ContactsPage,
    ChatsPage,
    SettingsPage,
    ConversationPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ContactsPage,
    ChatsPage,
    SettingsPage,
    ConversationPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProcessHttpmsgProvider,
    UserProvider,
    ChatProvider
  ]
})
export class AppModule {}
