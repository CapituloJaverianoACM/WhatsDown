import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

import { baseUrl } from '../../shared/baseurl';
import * as io from 'socket.io-client';

/**
 * Generated class for the ChatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  socket: any;
  chats = [];
  chatInput: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider) {
    this.socket = io('http://localhost:3000');
    this.socket.on('message', (msg) => {
      console.log("message", msg);
      this.chats.push(msg.message);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

  /**
    * Makes a message object with the content if the input field.
    * Sends the message to the server.
    * TODO - Persist information.
    * @param {string} message user's message.
    */
  sendMessage(message: string) {
    let newMessage = {
      message: message,
      username: this.userProvider.getCurrentLogedInUsername()
    }
    this.socket.emit('message', newMessage);
    this.chatInput = '';
  }

}
