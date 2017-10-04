import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Bet } from "../../models/bet";
//Dummy data
import { BetList } from "../betting/betList";

@Injectable()
export class BettingService {

  url: string = 'http://localhost:57687/';

  constructor(private http: HttpClient) { }

  //Get all bettings
  GetBets() : Observable<Bet> {
    return this.http.get(this.url + 'api/Bets')
      .map(this.extractData)
      .catch(this.handleError)
  }

  GetDummyData() {
    return BetList;
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
