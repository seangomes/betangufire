import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../providers/auth/auth.service";
import { User } from "../models/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage : string;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createSignupForm();
  }

  createSignupForm() {
    //Validator login form model
    this.signupForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  signup({value, valid} : {value: User, valid: boolean}) {
    this.authService.signup(value.email, value.password, value.username)
      .then((cb) => {
        if (cb != undefined) {
          if (cb.code === "auth/invalid-email" || cb.code === "auth/email-already-in-use" || cb.code === "auth/wrong-password" || cb.code === "auth/user-not-found") {
            this.errorMessage = cb.message;
          }
        }else {
          this.errorMessage == "";
          this.router.navigateByUrl("/login");
        }
      });



  }

}
