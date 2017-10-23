import { Component, OnInit } from '@angular/core';
import { AuthService } from "../providers/auth/auth.service";
import { UserService } from "../providers/user/user.service";
import { User } from "../models/user";
import { Router } from '@angular/router';
import { LoaderService } from "../providers/loader/loader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn : boolean = false;
  user = null;
  userList : any[] = [];
  constructor(private authService: AuthService, private userService : UserService, private loaderService: LoaderService, private router: Router) {
    this.isLoggedIn = this.authService.getIsLoggedIn();
   }

  ngOnInit() {

  }

  GetFbUser() {
    //this.userService.GetFbUser().subscribe(data => this.user = data);
  }

  GetFbUsers() {
    // this.userService.GetAllFbUsers().subscribe((data) => {
    //   this.userList = data;
    //   console.log(data);
    // });
  }

  signOut() {
    this.authService.signout();
  }

  gotoAdimPage() {
    this.router.navigate(['admin-section']);
  }

  showLoader() {
    this.loaderService.showLoader();
  }

  hideLoader() {
    this.loaderService.hideLoader();
  }
}
