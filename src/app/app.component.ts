import { Component } from '@angular/core';
import { AuthService } from "./providers/auth/auth.service";
import { UserService } from "./providers/user/user.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoggedIn : boolean;
  public currentUser : any;

  constructor(private authService: AuthService) {
    //Check localstorage
    let ls = JSON.parse(localStorage.getItem('currentUser'));

    if(ls) {
      this.authService.setIsLoggedIn(true);
      //We are logged in trogh storage
      this.authService.isLoggedIn().subscribe(data => {
        this.isLoggedIn = data;
        //console.log("boolean; ", data);
      });
      this.authService.currentUser(ls).subscribe(userData => {
        this.currentUser = userData;
        //console.log("currentUser; ", userData);
      });
    }

  }


}
