import { AnimatedComponent } from "components/AnimatedComponent";
import { MatchStats } from "features/MatchDetailPage/MatchDetail/MatchStats";
import { IMatch } from "interfaces/matches";
import { IStats, ITeamStats } from "interfaces/teamStats";
import { MatchStatsTeam } from "../../MatchStatsTeam";

interface IMatchOverallStats {
    match: IMatch;
    stats: ITeamStats[];
}

export const MatchOverallStats = ({ match, stats }: IMatchOverallStats) => {
    const t1Stats: IStats = stats?.filter(
        (item: ITeamStats) =>
            item.team1.shortname === match.team1.shortname && !item?.team2
    )?.[0]?.stats;

    const t2Stats: IStats = stats?.filter(
        (item: ITeamStats) =>
            item.team1.shortname === match.team2.shortname && !item?.team2
    )?.[0]?.stats;

    return (
        <AnimatedComponent type="slide">
            <div className="section">
                <h1 className="mb-4 text-center text-xl font-bold">
                    Overall Wins
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    <MatchStatsTeam team={match?.team1} />

                    <MatchStatsTeam team={match?.team2} />

                    <MatchStats
                        stats={t1Stats}
                        stats2={t2Stats}
                        type={match?.type}
                    />
                </div>
            </div>
        </AnimatedComponent>
    );
};
