import { ITeamShort } from "./teams";

export interface IMatchHistory {
    id: number;
    team1: ITeamShort;
    team2: ITeamShort;
    winner: ITeamShort | null;
    bat_first: ITeamShort | null;
    slug: string;
    date: string;
    type: string;
    status: string;
    win_type: string;
    win_margin: number;
    result: string;
}
