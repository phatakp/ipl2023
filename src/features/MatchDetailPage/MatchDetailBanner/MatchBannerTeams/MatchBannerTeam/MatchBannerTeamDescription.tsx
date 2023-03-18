import { MatchBannerTeamOversGrid } from "features/MatchDetailPage/MatchDetailBanner/MatchBannerTeams/MatchBannerTeam/MatchBannerTeamOversGrid";
import { ITeamScore } from "interfaces/matches";

interface IMatchDetailTeamDescription {
    score: ITeamScore | null;
    type: "l" | "r";
    winner: boolean;
}

export const MatchBannerTeamDescription = ({
    type,
    winner,
    score,
}: IMatchDetailTeamDescription) => {
    const ovs = Math.floor(score?.overs ?? 0 / 2);
    return (
        <div
            className={`flex flex-col space-y-2 text-center ${
                type === "l" ? "md:text-right" : "md:text-left"
            }`}
        >
            <span
                className={`text-2xl font-bold md:text-4xl ${
                    winner ? "text-white" : "text-gray-500"
                }`}
            >
                {score?.runs ?? 0}/{score?.wickets ?? 0}
            </span>
            <span
                className={`text-sm font-semibold md:text-base ${
                    winner ? "text-white" : "text-gray-500"
                }`}
            >
                Run Rate:
                {((score?.runs ?? 0) / (score?.overs ?? 1)).toFixed(2)}
            </span>
            <span
                className={`text-sm font-semibold ${
                    winner ? "text-white" : "text-gray-500"
                }`}
            >
                Overs:{score?.overs ?? 0}/20
            </span>

            <MatchBannerTeamOversGrid type={type} winner={winner} ovs={ovs} />
        </div>
    );
};
