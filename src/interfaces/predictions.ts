import { IMatchShort } from "./matches";
import { ITeamShort } from "./teams";

export interface IPred {
    id: number;
    team: ITeamShort | null;
    match: IMatchShort;
    user: IPredUser;
    amount: number;
    result: number;
    status: string;
    create_upd_time: string;
    double: boolean;
    updated: boolean;
}

interface IPredUser {
    id: number;
    name: string;
    email: string;
}

export interface IPredictionData {
    id?: number;
    matchNum: number;
    teamName: string;
    amount: number;
}
