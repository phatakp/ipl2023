import { ITeamShort } from "./teams";

export interface ITeamStats {
    id: number;
    team1: ITeamShort;
    team2?: ITeamShort;
    stats: IStats;
    played: number;
}

export interface IStats {
    all: number;
    away: number;
    home: number;
    last10: number;
    batFirst: number;
    knockout: number;
}
