import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from "../../models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  private UserSubject = new BehaviorSubject(null);
  public user: User;
  public userList: User[] = [];
  public authState: any = null;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });

  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current logged in user data
  get currentUser(): Observable<User> {
    return this.UserSubject.asObservable();
    //return this.authenticated ? this.authState : null;
  }

  //Returns curremt user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  //Email + password login
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        return error;
      })
  }

  signup(email: string, password: string, username: string) {
    if (email !== null && password !== null) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.createNewUserObjInFirebase(user, username);
        })
        .catch((error) => {
          console.log("error: ", error);
          return error;
        })
    }
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    let auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then((message) => {
        return message;
      })
      .catch((error) => {
        return error;
      })
  }

  //Signout
  signout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  ////HELPERS//////
  private createNewUserObjInFirebase(user, username): void {
    if (user !== null) {

      //update auth displayname
      user.updateProfile({ displayName: username })
        .then((data) => {
          let userId = user.uid;

          //Create a new user in realtime DB
          this.db.object("/users/" + userId).set({
            email: user.email,
            firstname: "",
            lastname: "",
            username: user.displayName,
            money: 1000
          });
        })
        .catch((error) => console.log("error auth update: ", error));
    }
  }
}
