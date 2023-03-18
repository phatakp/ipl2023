import { ITeamScore } from "interfaces/matches";

export const MatchCarouselScore = ({
    score,
    team,
}: {
    score: ITeamScore | null;
    team: "l" | "r";
}) => {
    return (
        <div className={`m${team}-2`}>
            <span className="font-semibold">{score?.runs ?? 0}</span>
            <span className="mx-1 text-gray-600">/</span>
            <span className="text-gray-600">{score?.wickets ?? 0}</span>
        </div>
    );
};
