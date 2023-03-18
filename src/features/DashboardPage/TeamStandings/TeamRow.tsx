import { ITeam } from "interfaces/teams";

export const TeamRow = ({ team }: { team: ITeam }) => {
    return (
        <div className="mx-2 mt-1 mb-4 grid grid-cols-5 items-center gap-2 rounded-lg border-2 border-gray-500 bg-white px-2 text-left text-sm font-semibold text-gray-700">
            <div className="col-span-2 flex flex-row items-center justify-start py-1 text-gray-900">
                <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${team.shortname}.png`}
                    alt="Team Logo"
                    className="mr-1 h-8 w-8"
                />
                <span>{team.shortname}</span>
            </div>
            <div className="py-1 text-right">{team.played}</div>
            <div className="py-1 text-right">{team.nrr.toFixed(3)}</div>
            <div className="py-1 text-right">{team.points}</div>
        </div>
    );
};
