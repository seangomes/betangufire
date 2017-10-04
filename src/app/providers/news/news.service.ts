import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { News } from "../../models/news";

@Injectable()
export class NewsService {

  url: string = 'http://localhost:57687/';

  constructor(private http: HttpClient) { }



  //Get all news
  GetNews(): Observable<News[]> {
    return this.http.get(this.url + 'api/News')
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
