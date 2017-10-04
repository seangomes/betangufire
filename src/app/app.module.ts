import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { ReactiveFormsModule } from '@angular/forms';

//COMPONENTS
import { AppComponent } from './app.component';
import { NavigationComponent } from "./navigation/navigation.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { TabMenuComponent } from "./tab-menu/tab-menu.component";
import { BettingComponent } from "./betting/betting.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

//SERVICES
import { BettingService } from "./providers/betting/betting.service";
import { UserService } from "./providers/user/user.service";
import { AuthService } from "./providers/auth/auth.service";


//ROUTES
const appRoutes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'bet',  component: BettingComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  //{ path: 'news', component: NewsComponent },
  //{ path: 'ranks',  component: RanksComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    NavigationComponent,
    PagenotfoundComponent,
    BettingComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }) // <-- debugging purposes only
  ],
  providers: [AuthService, BettingService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
