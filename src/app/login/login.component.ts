import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { AuthService } from "../providers/auth/auth.service";
import { User } from "../models/user";
import { Router } from '@angular/router';
import { LoaderService } from "../providers/loader/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;
  loader : boolean;

  constructor(private authService: AuthService, private loaderSerice: LoaderService, private fb: FormBuilder, private router: Router) {
    //Connecting loader
    this.loaderSerice.getLoader().subscribe(loaderData => this.loader = loaderData);

    //If logged in redirect to home
    if(this.authService.getIsLoggedIn()) {
      router.navigate(['home']);
    }

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
    //Starts the loader
    this.loaderSerice.showLoader();
    this.authService.login(value.email, value.password)
      .then((data) => {
        this.message = data;
        this.loaderSerice.hideLoader();
      } )
      .catch((error) => this.message = error);
  }
}
