import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../providers/auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn : boolean = false;
  currentUser: any = {};
  constructor(private router: Router, private authService: AuthService) {
    //Check if loggged in
    this.isLoggedIn = this.authService.authenticated;
    this.currentUser = this.authService.currentUser;
    console.log("nav isLoggedIn?: ", this.isLoggedIn);
    console.log("nav currentUser?: ", this.currentUser)
  }


  ngOnInit() {

  }


  loginLink() {
    this.router.navigateByUrl('/login');
  }
}
