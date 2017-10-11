import { Component, OnInit } from '@angular/core';
import { AuthService } from "../providers/auth/auth.service";
import { User } from "../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn : boolean = false;

  constructor(private authService: AuthService) {

   }

  ngOnInit() {

  }


}
