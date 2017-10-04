export interface Bet {
  betId:number;
  category: string;
  country: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  matchDay: string;
  matchTime: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
}
