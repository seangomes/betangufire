import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { AuthService } from "../providers/auth/auth.service";
import { User } from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {

   }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    //Validator login form model
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login({value, valid} : { value : User, valid: boolean }) {
    this.authService.login(value.email, value.password);
  }
}
