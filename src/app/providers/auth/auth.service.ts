import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import { User } from "../../models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  public user : User;
  public userList : User[] = [];

  constructor() { }


  login(email:string, password:string) {

  }

  signup(email:string, password:string) {

  }
}
