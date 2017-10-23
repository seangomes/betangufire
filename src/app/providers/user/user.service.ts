import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from "../../models/user";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from "../../providers/auth/auth.service";

@Injectable()
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user$: Observable<any> = this.userSubject.asObservable();
  public users$: Observable<any>;
  private authSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  users: Observable<User[]>;
  items: Observable<any[]>;
  public currentUser : any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private messageSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public message$ : Observable<any> = this.messageSubject.asObservable();
  constructor(private auth: AngularFireAuth, private af: AngularFireDatabase) {
  }

  //GetFirebaseUser
  GetFbUser(userId: string): Observable<User> {
    if (userId) {
      //Get user in fb db
      let user: AngularFireObject<{}> = this.af.object('/users/' + userId);
      user.snapshotChanges().subscribe(snapshot => {
        this.userSubject.next(snapshot.payload.val());
      });
    }

    return this.user$;
  }

  //GetAllFbUsers
  GetAllFbUsers(): Observable<User[]> {
    this.users$ = this.af.list('/users').valueChanges();
    return this.users$;
  }


  UpdateFbUser(firstname: string, lastname: string): Observable<string> {
    //Gets currentUserId
    let currentUser = this.userSubject.getValue();
    //Set the user in FB db
    let userRef = this.af.object('/users/' + currentUser.id );
    userRef.update({
      firstname: firstname,
      lastname: lastname
    })
    .then((data) => {
      //update app currentUser
      let updatedCurretUser : User = {
        id: currentUser.id,
        email: currentUser.email,
        firstname: firstname,
        lastname: lastname,
        money: currentUser.money,
        username: currentUser.username,
        password: currentUser.password
      };
      this.userSubject.next(updatedCurretUser);
      this.messageSubject.next("Din bruger er nu opdateret");

    })
    .catch((error) => {
      console.log("error : ", error)
      this.messageSubject.next(error);
    });

    return this.message$;
  }
}
