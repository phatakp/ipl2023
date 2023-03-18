import { IMatch } from "interfaces/matches";
import { MatchListTeam } from "./MatchListTeam";

export const MatchListTeams = ({ match }: { match: IMatch }) => {
    return (
        <div className="flex flex-row items-center justify-between gap-2 border-b-2 border-gray-200 py-2 pb-2 md:col-span-2 md:col-start-1 md:border-b-0 md:border-r-2 md:pb-0 md:pr-2">
            <MatchListTeam team={match.team1} score={match.t1score} type="l" />
            <span className="text-gray-500">vs</span>
            <MatchListTeam team={match.team2} score={match.t2score} type="r" />
        </div>
    );
};
