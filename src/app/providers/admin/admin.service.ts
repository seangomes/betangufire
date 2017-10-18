import { Injectable } from '@angular/core';
import { Teams } from "../../data/teams";
import { Team } from "../../models/team";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {

  teamsFromFile: Team[] = Teams

  constructor(private db: AngularFireDatabase) { }


  readTeamsFromFileToFBDB() : void {
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
}
