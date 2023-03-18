import { AnimatedComponent } from "components/AnimatedComponent";
import { MatchStats } from "features/MatchDetailPage/MatchDetail/MatchStats";
import { IMatch } from "interfaces/matches";
import { ITeamStats } from "interfaces/teamStats";
import { MatchStatsTeam } from "../../MatchStatsTeam";

interface IMatchHeadtoHead {
    match: IMatch;
    stats: ITeamStats[];
}

export const MatchHeadtoHead = ({ match, stats }: IMatchHeadtoHead) => {
    const t1H2HStats: ITeamStats = stats?.filter(
        (item: ITeamStats) =>
            item.team1.shortname === match?.team1?.shortname &&
            item?.team2?.shortname === match?.team2?.shortname
    )?.[0];

    const t2batfirst: number = stats?.filter(
        (item: ITeamStats) =>
            item.team1.shortname === match?.team2?.shortname &&
            item?.team2?.shortname === match?.team1?.shortname
    )?.[0]?.stats?.batFirst;

    return (
        <AnimatedComponent type="slide">
            <div className="section">
                <h1 className="mb-4 text-center text-xl font-bold">
                    Head to Head Wins
                </h1>
                <div className="grid grid-cols-3 gap-4">
                    <MatchStatsTeam team={match?.team1} />

                    <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-semibold">Played</span>
                        <span className="text-4xl font-bold text-pink-600">
                            {t1H2HStats?.played}
                        </span>
                    </div>

                    <MatchStatsTeam team={match?.team2} />

                    <MatchStats
                        stats={t1H2HStats?.stats}
                        type={match?.type}
                        t2batfirst={t2batfirst}
                    />
                </div>
            </div>
        </AnimatedComponent>
    );
};
