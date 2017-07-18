import { Injectable } from '@angular/core';
import { User} from '../../shared/user';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { baseUrl } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/**
 * A manager for the request to login, register, logout and
 * all the services provided by the API that include users.
 */

@Injectable()
export class UserProvider {

  private currentLogedInUsername: string;

  constructor(
    public http: Http,
    private processHTTPMsgService: ProcessHttpmsgProvider
  ) { }

  /**
    * Sends a request to login. Stores the JWT to keep making
    * requests to guarded routes of the API.
    * @param {User} userCredentials username and password to login.
    * @return {Observable<Response>} API's response.
    */

  loginUser(userCredentials: User): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'users/login';
    return this.http.post(apiEndPoint, userCredentials, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
    }

  /**
    * Sends a request to create a new user with the values provided by
    * the object User that goes through parameters.
    * @param {User} newUser new user to create values.
    * @return {Observable<Response>} API's response.
    */
  registerUser(newUser: User): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'users/register';
    return this.http.post(apiEndPoint, newUser, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  /**
    * Sets a local variable with the logged user.
    * TODO - Save it in the divice's memory.
    * @param {string} currentLogedInUsername loggend username
    */
  setCurrentLogedInUsername(currentLogedInUsername: string) {
    this.currentLogedInUsername = currentLogedInUsername;
  }

  /**
    * Gets the current logged in user's username.
    * @return {string} currentLogedInUsername
    */

  getCurrentLogedInUsername(): string {
    return this.currentLogedInUsername;
  }
  /**
    * Sends a request to get the current loged in user information.
    * @param {User} user user to get it's profile.
    * @return {Observable<User>} API's response.
    */
  getUserProfile(): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'users/' + this.currentLogedInUsername;
    return this.http.get(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  /**
    * Gets the current logged in user's contacts.
    * @param {User} user user to get it's contacts.
    * @return {Observable<User[]>} API's response.
    */
  getUserContacts(): Observable<User[]> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint =
      baseUrl + 'users/' + this.currentLogedInUsername + '/contacts';
    return this.http.get(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  /**
    * Adds a new contact to the user's contact list.
    * @param {string} newContactUsername new contact username.
    */

  addContact(newContactUsername: string): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint =
      baseUrl + 'users/' + this.currentLogedInUsername +
        '/contacts/' + newContactUsername;
    return this.http.put(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  /**
    * Deletes contact form the user's contact list.
    * @param {string} deleteContactUsername contact to delete.
    */
  removeContact(deleteContactUsername: string): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let apiEndPoint =
      baseUrl + 'users/' + this.currentLogedInUsername +
        '/contacts/' + deleteContactUsername;
    return this.http.delete(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }


}
