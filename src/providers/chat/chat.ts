import { Injectable } from '@angular/core';
import { Chat} from '../../shared/chat';
import { Message} from '../../shared/message';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { baseUrl } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(
    public http: Http,
    private processHTTPMsgService: ProcessHttpmsgProvider
  ) { }

  /**
    * Sends a request to start a new chat with the host as the current
    * user and the recipient as the contact choosen.
    * @param {Chat} newChat chat object with the host and recipient usernames.
    * @return {Observable<Response>} API's response.
    */
  startChat(newChat: any): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'chats';
    return this.http.post(apiEndPoint, newChat, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error)});
  }

  /**
    * Sends a request to add a new message to a chat with
    * id specifiend in the newMessage object.
    * @param {Message} newMessage message to be added.
    * @param {string} chatId chat's id to add the message to.
    * @return {Observable<Response>} API's response.
    */
  addMessageToChat(newMessage: Message, chatId: string): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'chats';
    let requestInformation = {
      chatId: chatId,
      newMessage: newMessage
    };
    return this.http.put(apiEndPoint, requestInformation, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
  }

  /**
    * Retreaves all the chats in witch the specified username is involved in.
    * @param {string} username userneme to get it's chats
    * @return {Observable<Chat[]>} API's response.
    */
  getUsersConversation(username: string): Observable<Chat[]> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'chats/' + username;
    return this.http.get(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
  }

  /**
    * Sends request to delete the chat with a specified Id.
    * @param {string} chatId chat's id to be removed.
    * @return {Observable<Response>} API's response.
    */
  removeChat(username: string, chatId: string): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'chats/' + username + '/' + chatId;
    return this.http.delete(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
  }

}
