import { ITeamShort } from "interfaces/teams";

export enum AuthPageType {
    LOGIN = "login",
    REGISTER = "register",
    CHANGEPASSWORD = "change-password",
    RESETPASSWORD = "reset-password",
    CHANGEWINNER = "change-winner",
    VALIDATEUSER = "validate-user",
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IRegisterData {
    name: string;
    email: string;
    password: string;
    password2: string;
    ipl_winner: string;
}

export interface IResetPwdData {
    id: number;
    password: string;
    password2: string;
}

export interface IChangePwdData {
    old_password: string;
    password: string;
    password2: string;
}

export interface IChangeWinnerData {
    ipl_winner: string;
}

export interface ILoginResponse {
    refresh: string;
    access: string;
    refresh_expires: number;
    access_expires: number;
}

export interface IUserShort {
    id: number;
    name: string;
    email: string;
}

export interface IUserStats {
    won: number;
    draw: number;
    lost: number;
    played: number;
}

export interface IUser extends IUserShort {
    is_site_admin: boolean;
    winner: ITeamShort;
    doubles: number;
    amount: number;
    stats: IUserStats;
    form: string[];
    rank: number;
    paid: boolean;
}
