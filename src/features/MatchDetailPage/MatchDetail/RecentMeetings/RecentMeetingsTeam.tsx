import { ITeamShort } from "interfaces/teams";

export const RecentMeetingsTeam = ({
    team,
    type,
    winner,
}: {
    team: ITeamShort;
    winner: ITeamShort | null;
    type: "l" | "r";
}) => {
    return (
        <div
            className={`flex flex-nowrap items-center justify-end space-x-2 py-1 ${
                type === "l" ? "flex-row" : "flex-row-reverse"
            }`}
        >
            <span className="sm:hidden">{team?.shortname}</span>
            <span className="hidden sm:flex">{team?.longname}</span>
            <img
                src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${team?.shortname}.png`}
                alt="Team Logo"
                className="h-12 w-12"
            />
            <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    winner
                        ? winner.shortname === team?.shortname
                            ? "bg-green-500"
                            : "bg-red-600"
                        : "bg-gray-500"
                } text-xs text-white`}
            >
                {winner
                    ? winner.shortname === team?.shortname
                        ? "W"
                        : "L"
                    : "-"}
            </span>
        </div>
    );
};
