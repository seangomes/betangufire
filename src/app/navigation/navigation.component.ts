import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../providers/auth/auth.service";
import { UserService } from "../providers/user/user.service";
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn$ : boolean;
  currentUser: any = {};
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    //Check if loggged in
    this.authService.isLoggedIn().subscribe(data => this.isLoggedIn$ = data);
    this.authService.currentUser$.subscribe(data =>
      {
        this.currentUser = data;
        //console.log(data);
      });
  }

  ngOnInit() {

  }

  goToUserSite() {
    if(this.isLoggedIn$){
      this.router.navigateByUrl("/user-site");
    }else {
      this.router.navigateByUrl("/login");
    }
  }

  goToMatchSection() {
    if(this.isLoggedIn$){
      this.router.navigateByUrl("/admin-kampe");
    }else {
      this.router.navigateByUrl("/login");
    }
  }

  loginLink() {
    if(this.isLoggedIn$){
      this.router.navigateByUrl("/home");
    }else {
      this.router.navigateByUrl('/login');
    }
  }
}
