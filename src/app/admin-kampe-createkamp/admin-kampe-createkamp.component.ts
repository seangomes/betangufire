import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AdminService } from "../providers/admin/admin.service";
import { Team } from 'app/models/team';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-kampe-createkamp',
  templateUrl: './admin-kampe-createkamp.component.html',
  styleUrls: ['./admin-kampe-createkamp.component.css']
})
export class AdminKampeCreatekampComponent implements OnInit {
  newTeamForm: FormGroup;
  public teams : Team[];
  homeActive : boolean;
  awayActive: boolean;
  selectedHomeItem : Team = { id:"", code:"", crestUrl:"", name:"", shortName: ""};
  selectedAwayItem : Team = { id:"", code:"", crestUrl:"", name:"", shortName: ""};

  constructor(private adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createTeamForm();
    this.getTeams();
  }

  createTeamForm() {
    //Validator login form model
    this.newTeamForm = this.fb.group({
      homeTeam: ['', [Validators.required]],
      awayTeam: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  toggleHomeClass(team) {
    this.selectedHomeItem = null;
    this.selectedHomeItem = team;
  }

  toggleAwayClass(team) {
    this.selectedAwayItem = null;
    this.selectedAwayItem = team;
  }

getTeams() {
  this.adminService.getTeams().subscribe(data => {
    this.teams = data;
    console.log(this.teams);
  });

}

}
