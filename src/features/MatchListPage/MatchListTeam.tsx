import { ITeamScore } from "interfaces/matches";
import { ITeamShort } from "interfaces/teams";

export const MatchListTeam = ({
    team,
    score,
    type,
}: {
    team: ITeamShort;
    score: ITeamScore | null;
    type: "l" | "r";
}) => {
    return (
        <div
            className={`flex flex-col items-center justify-center sm:gap-3 ${
                type === "l" ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
        >
            <img
                src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${team.shortname}.png`}
                alt="Team Logo"
                className="h-20 w-20 lg:h-28 lg:w-28"
            />
            <div
                className={`flex flex-col text-center ${
                    type === "l" ? "sm:text-left" : "sm:text-right"
                }`}
            >
                <em className="text-xs font-semibold uppercase text-blue-900 sm:text-base md:text-lg">
                    {team.longname}
                </em>
                <span className="text-lg font-bold text-blue-800 sm:text-xl">
                    {score?.runs ?? 0}/{score?.wickets ?? 0}
                </span>
                <span className="text-sm font-semibold text-gray-500">
                    ({score?.overs ?? 0} OV)
                </span>
            </div>
        </div>
    );
};
