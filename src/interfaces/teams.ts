export interface ITeam {
    id: number;
    form: ITeamForm[];
    longname: string;
    shortname: string;
    active: boolean;
    played: number;
    won: number;
    lost: number;
    draw: number;
    points: number;
    nrr: number;
}

export interface ITeamForm {
    team: string;
    winner: string | null;
}

export interface ITeamShort {
    id: number;
    longname: string;
    shortname: string;
}
