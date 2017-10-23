import { Bet } from "./bet";

export class Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchDay: string;
  matchTime: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  createdByUserId: string;
  betList: Array<Bet>;
  active: boolean;
}
