import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AdminService } from "../providers/admin/admin.service";
import { Team } from 'app/models/team';

@Component({
  selector: 'app-admin-kampe-createkamp',
  templateUrl: './admin-kampe-createkamp.component.html',
  styleUrls: ['./admin-kampe-createkamp.component.css']
})
export class AdminKampeCreatekampComponent implements OnInit {
  public teams : Team[];
  homeActive : boolean;
  awayActive: boolean;
  selectedHomeItem : Team;
  selectedAwayItem : Team;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getTeams();
    this.homeActive = false;
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
