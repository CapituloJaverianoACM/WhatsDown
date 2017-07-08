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
        .catch(error => { return this.processHTTPMsgService.handleError(error)});
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

}
