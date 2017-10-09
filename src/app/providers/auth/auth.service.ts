import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import { User } from "../../models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  public user : User;
  public userList : User[] = [];
  public authState: any = null;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router:Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });

   }

  // Returns true if user is logged in
  get authenticated() : boolean {
    return this.authState !== null;
  }

  // Returns current logged in user data
  get currentUser(): User {
    return this.authenticated ? this.authState : null;
  }

  //Returns curremt user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  //Email + password login
  login(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((user) => {
        this.authState = user;
      })
      .catch((error) => {
        return error;
      })
  }

  signup(email:string, password:string, username: string) {
    if(email !== null && password !== null) {
     return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
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
  resetPassword(email:string) {
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

  createNewUserTest() {

    //let userKey = "aaasfsaasdkwkrk0234a";
    let user = this.afAuth.auth.currentUser;

    //insert in db
    this.db.object("/users/"+user.uid).set({
      email : user.email,
      firstname : "",
      lastname : "",
      money : 1000,
      username : user.displayName
    })
  }


  ////HELPERS//////
  private createNewUserObjInFirebase(user, username) : void {
    if(user !== null) {

      //update auth displayname
      user.updateProfile({displayName : username})
        .then((data) => console.log("auth user updated: ", data ))
        .catch((error) => console.log("error auth update: ", error));

    //   let userId = this.authState.uid;
    //   let userId = user.uid;

    //   Insert in firebase as new user
    //   this.db.object("/users/"+userId).set({
    //     email:user.email,
    //     firstname: "user.firstname",
    //     lastname: "user.lastname",
    //     username: user.DisplayName,
    //     money: 1000
    //  })

    //   this.router.navigate(["/login"]);
    }



  }
}
