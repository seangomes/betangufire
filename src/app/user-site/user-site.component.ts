import { Component, OnInit } from '@angular/core';
import { UserService } from "../providers/user/user.service";
import { BetList } from "../providers/betting/betList";
import { Bet } from "../models/bet";
@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent implements OnInit {

  currentUser: any;
  recentBets: Bet[] = BetList;


  constructor(private userService: UserService) {

   }

  ngOnInit() {
    this.GetCurrentUser();
  }

  GetCurrentUser() {
    this.userService.user$.subscribe(user => this.currentUser = user);
  }

}
