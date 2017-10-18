import { Component, OnInit } from '@angular/core';
import { AdminService } from "../providers/admin/admin.service";

@Component({
  selector: 'app-admin-create-teamlist',
  templateUrl: './admin-create-teamlist.component.html',
  styleUrls: ['./admin-create-teamlist.component.css']
})
export class AdminCreateTeamlistComponent implements OnInit {

  message: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }


  generateTeams() {
    this.adminService.readTeamsFromFileToFBDB();
  }
}
