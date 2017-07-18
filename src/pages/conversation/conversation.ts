import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ChatProvider } from '../../providers/chat/chat';
import { Chat } from '../../shared/chat';
import { Message } from '../../shared/message';

import * as io from 'socket.io-client';

/**
 * Generated class for the ConversationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage implements OnInit {

  @ViewChild('navbar') navBar: Navbar;
  chatRoom: Chat;
  socket: any;
  chatMessages: Message[];
  chatInput: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatProvider: ChatProvider,
    private userProvider: UserProvider) {
    this.chatRoom = navParams.get('chatRoom');
    this.chatMessages = this.chatRoom.messages;
    // console.log("Size Message: " + this.chatMessages.length);
    // this.socket = io('http://localhost:3000');
    // this.socket.on('message', (msg: Message) => {
    //   console.log("message", msg);
    //   if(msg.chatId === this.chatRoom._id) {
    //     this.chatMessages.push(msg);
    //   }
    // });
  }

  ngOnInit() {
    console.log("Size Message: " + this.chatMessages.length);
    this.socket = io('http://localhost:3000');
    this.socket.on('message', (msg: Message) => {
      console.log("message", msg);
      if(msg.chatId === this.chatRoom._id) {
        this.chatMessages.push(msg);
      }
      this.socket.on('disconnect', () => {
        this.chatMessages = [];
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
    this.navBar.backButtonClick = () =>{
      this.socket.disconnect();
      this.socket.close();
      this.navCtrl.pop();
    }
  }

  /**
    * Makes a message object with the content if the input field.
    * Sends the message to the server.
    * TODO - Persist information.
    * @param {string} message user's message.
    */
  sendMessage(message: string) {
    let newMessage: Message = {
      content: message,
      chatId: this.chatRoom._id,
      senderUsername: this.userProvider.getCurrentLogedInUsername(),
      typestamp: new Date()
    };
    this.chatProvider.addMessageToChat(newMessage, this.chatRoom._id)
      .subscribe(()=>{});
    this.socket.emit('message', newMessage);
    this.chatInput = '';
  }

}
