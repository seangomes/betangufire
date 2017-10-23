import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Bet } from "../../models/bet";
//Dummy data
//import { BetList } from "../betting/betList";

@Injectable()
export class BettingService {



  constructor(private http: HttpClient) { }



  GetDummyData() {
    //return BetList;
  }


}
