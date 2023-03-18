import { ITeamShort } from "interfaces/teams";

export const MatchBannerTeamName = ({ team }: { team: ITeamShort }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img
                src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${team?.shortname}.png`}
                alt="Team Logo"
                className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36"
            />

            <span className="md:36 mb-8 w-28 text-xs font-semibold text-white sm:text-base md:text-lg lg:w-full lg:text-2xl">
                {team?.longname}
            </span>
        </div>
    );
};
