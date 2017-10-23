import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//COMPONENTS
import { AppComponent } from './app.component';
import { NavigationComponent } from "./navigation/navigation.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { TabMenuComponent } from "./tab-menu/tab-menu.component";
import { BettingComponent } from "./betting/betting.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { AdminCreateTeamlistComponent } from './admin-create-teamlist/admin-create-teamlist.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { AdminKampeComponent } from './admin-kampe/admin-kampe.component';

//SERVICES
import { BettingService } from "./providers/betting/betting.service";
import { UserService } from "./providers/user/user.service";
import { AuthService } from "./providers/auth/auth.service";
import { UserSiteComponent } from './user-site/user-site.component';
import { AdminService } from "./providers/admin/admin.service";
import { AlertService } from "./providers/alert/alert.service";
import { LoaderService } from "./providers/loader/loader.service";

//GUARDS
import { AuthGuard } from "./guards/auth.guard";
import { KampelistComponent } from './kampelist/kampelist.component';
import { AdminKampeCreatekampComponent } from './admin-kampe-createkamp/admin-kampe-createkamp.component';


//ROUTES
const appRoutes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'bet',  component: BettingComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'user-site', component: UserSiteComponent, canActivate: [AuthGuard] },
  { path: 'admin-section', component: AdminSectionComponent, canActivate: [AuthGuard]},
  { path: 'admin-teamlist', component: AdminCreateTeamlistComponent, canActivate: [AuthGuard]},
  { path: 'admin-kampe', component: AdminKampeComponent, canActivate: [AuthGuard]},
  //{ path: 'ranks',  component: RanksComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PagenotfoundComponent }
];

//FIREBASE
export const firebaseConfig = {
  apiKey: "AIzaSyAV-I_zDPfh-b4_3dHAQqrhfVYQySV3We0",
  authDomain: "bettingmanager-9bc20.firebaseapp.com",
  databaseURL: "https://bettingmanager-9bc20.firebaseio.com",
  projectId: "bettingmanager-9bc20",
  storageBucket: "bettingmanager-9bc20.appspot.com",
  messagingSenderId: "534443749204"
};

@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    NavigationComponent,
    PagenotfoundComponent,
    BettingComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UserSiteComponent,
    AdminSectionComponent,
    AdminCreateTeamlistComponent,
    UserEditComponent,
    AlertComponent,
    LoaderComponent,
    AdminKampeComponent,
    KampelistComponent,
    AdminKampeCreatekampComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }) // <-- debugging purposes only
  ],
  providers: [
    AuthService,
    UserService,
    BettingService,
    AdminService,
    AlertService,
    LoaderService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
