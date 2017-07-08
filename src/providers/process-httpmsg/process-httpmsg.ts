import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';

/**
 * A processer for HTTP responses and to handle erros.
 */
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: Http) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }

  /**
   * Extracts the body of a request and validates it's content.
   * @return {JSON} body of the request.
   */
  public extractData(res: Response) {
    let body = res.json();
    body.status = res.status;
    return body || {};
  }

  /**
   * Handles the error that can be produced by a request to the server.
   * @return {Observable} Possible error.
   */
  public handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: Object;
    console.log(error);
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = {
        status: error.status,
        name: err.name,
        message: err.message
      };
    } else {
      errMsg = { message: error.message ? error.message : error.toString() };
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
