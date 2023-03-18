import { ITeamShort } from "interfaces/teams";

export const MatchStatsTeam = ({ team }: { team: ITeamShort }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <span>{team?.shortname}</span>
            <img
                src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${team?.shortname}.png`}
                alt="Team Logo"
                className="h-16 w-16 md:h-20 md:w-20 "
            />
        </div>
    );
};
