import { ITeamForm, ITeamShort } from "./teams";

export interface IMatch {
    id: number;
    team1: ITeamShort;
    team2: ITeamShort;
    winner: ITeamShort | null;
    bat_first: ITeamShort | null;
    result: string;
    num: number;
    slug: string;
    date: string;
    type: "league" | "qualifier 1" | "qualifier 2" | "eliminator" | "final";
    venue: string;
    min_bet: number;
    status: string;
    t1score: ITeamScore | null;
    t2score: ITeamScore | null;
    double: boolean;
    scheduled: boolean;
    started: boolean;
    entry_cutoff_passed: boolean;
    double_cutoff_passed: boolean;
    form: IMatchForm;
}

interface IMatchForm {
    team1: ITeamForm[];
    team2: ITeamForm[];
}

export interface ITeamScore {
    runs: number;
    overs: number;
    wickets: number;
}

export interface IMatchShort {
    id: number;
    team1: ITeamShort;
    team2: ITeamShort;
    num: number;
    status: string;
    slug: string;
}

export interface IMatchChangeData {
    matchNum: number;
    bfirst: string;
    wTeam: string;
    status: string;
    t1score: ITeamScore;
    t2score: ITeamScore;
}

export interface IMatchAddData {
    num: number;
    date: string;
    t1: string;
    t2: string;
    type: string;
    venue: string;
    min_bet: number;
}
