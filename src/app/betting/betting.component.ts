import { Component, OnInit } from '@angular/core';
import { BettingService } from "../providers/betting/betting.service";
import { Bet } from "../models/bet";
@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.css']
})
export class BettingComponent implements OnInit {

  betList : Bet[] = [];

  constructor(private betService: BettingService) { }

  ngOnInit() {
    this.betList = this.betService.GetDummyData();
  }

}
