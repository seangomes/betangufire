import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from "../../models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private userSubject : BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public currentUser$ = this.userSubject.asObservable();


  private isLoggedInSubject = new BehaviorSubject<boolean>(null);
  public authStateSubject = new BehaviorSubject<any>(null);


  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router, private userService: UserService) {
    this.authStateSubject.next(afAuth.auth);
  }

  //Check if user loggedIn
  isLoggedIn() : Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setIsLoggedIn(value : boolean) {
    this.isLoggedInSubject.next(value);
  }

  getIsLoggedIn() : boolean {
    return this.isLoggedInSubject.getValue();
  }

  // Returns current logged in user data
  currentUser(userId: string): Observable<User> {
    this.userService.GetFbUser(userId).subscribe((data) => {
      if(data !== undefined || data !== null) {
        //bind the user
        this.userSubject.next(data);
      }
    });
    return this.currentUser$;
  }

  getAuthState() : Observable<any> {
    return this.authStateSubject.asObservable();
  }

  //Email + password login
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        //Signed in
        this.isLoggedInSubject.next(true);
        //Get firebase user
        //console.log("login user data: ", user.uid);
        localStorage.setItem('currentUser', JSON.stringify(user.uid));
        //Get user from FB db
        this.currentUser(user.uid).subscribe(userData => {
          this.userSubject.next(userData);
          this.router.navigateByUrl('/home');
        });
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
    this.isLoggedInSubject.next(false);
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/bet']);
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
