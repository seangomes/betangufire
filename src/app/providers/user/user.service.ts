import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import { User } from "../../models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  url: string = 'http://localhost:57687/';
  users: Observable<User[]>;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {

  }

  //Get all the users
  GetUsers(): Observable<User[]> {
    return this.http.get(this.url + 'api/User')
      .map(this.extractData)
      .catch(this.handleError)
  }

  //Get single user
  GetUser(userId: number): Observable<User> {
    return this.http.get(this.url + 'api/user/'+userId)
      .map(this.extractData)
      .catch(this.handleError)
  }

  //Delete single user
  DeleteUser(user: User): Observable<User> {
    return this.http.delete(this.url + 'api/user/'+ "1")
      .map(this.extractData)
      .catch(this.handleError)
  }

  //Delete single user
  UpdateUser(user: User): Observable<User> {
    //let headers = this.headers;
    let body = JSON.stringify(user);
    return this.http.put(this.url + 'api/user/'+ "1", body)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res;
    return body || [];
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
