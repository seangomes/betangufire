import { Injectable } from '@angular/core';
import { Teams } from "../../data/teams";
import { Team } from "../../models/team";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable, BehaviorSubject } from 'rxjs';
import { Match } from "../../models/match";
import { AuthService } from 'app/providers/auth/auth.service';

@Injectable()
export class AdminService {

  teamsFromFile: Team[] = Teams
  private matchlistSubject: BehaviorSubject<Match[]> = new BehaviorSubject<Match[]>([]);
  public matchList$ = this.matchlistSubject.asObservable();

  private teamListSubject: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  public teamList$ = this.teamListSubject.asObservable();


  constructor(private db: AngularFireDatabase, private authServie: AuthService) { }


  readTeamsFromFileToFBDB(): void {
    this.teamsFromFile.forEach(team => {
      //Create a new user in realtime DB
      let ref = this.db.list('/teams').query.ref.push();
      ref.set({
        name: team.name,
        code: team.code,
        shortName: team.shortName,
        crestUrl: team.crestUrl
      })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    });
    console.log("Finish write to FB db");
  }




  //Get all Teams from FB
  getTeams(): Observable<Team[]> {

    let teams: Team[] = [];

    //let teams = this.db.list('teams');
    const ref = this.db.database.ref('/teams');

    ref.once("value").then(function (snapshot) {

      snapshot.forEach(function (childSnapshot) {
        let item: Team = {
          id: childSnapshot.key,
          name: childSnapshot.child('name').val(),
          shortName: childSnapshot.child('shortName').val(),
          code: childSnapshot.child('code').val(),
          crestUrl: childSnapshot.child('crestUrl').val(),
        };
        //console.log(item);
        teams.push(item);
      });
    }).then((data) => {
      this.teamListSubject.next(teams);
      //console.log(teams);
    });
    return this.teamList$;
  }

  //Get all matches
  getMatchList(): Observable<Match[]> {
    return this.matchList$;
  }

  //Create a new match
  createMatch(match: Match) {

    let curretUserId = this.authServie.currentUser$.subscribe(data => curretUserId = data);

    if (curretUserId) {

      //genereate new fb key
      let newKey: string = this.db.database.ref().push().key;

      let newMatch: Match = {
        createdByUserId: curretUserId,
        active: true,
        betList: [],
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        awayOdds: match.awayOdds,
        homeOdds: match.homeOdds,
        drawOdds: match.drawOdds,
        matchDay: match.matchDay,
        matchTime: match.matchTime,
        id: newKey
      }

      let matches = this.db.list('matches');
      matches.push(match);

      console.log(matches);

    }



  }
  //Update match

  //Delete match

}
