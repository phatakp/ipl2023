import { IStats } from "interfaces/teamStats";
import { getProb } from "utilities/getProb";
import { MatchStatsItem } from "./MatchStatsItem";

interface IMatchStats {
    stats: IStats;
    stats2?: IStats;
    type: string;
    t2batfirst?: number;
}
export const MatchStats = ({
    stats,
    type,
    t2batfirst,
    stats2,
}: IMatchStats) => {
    return (
        <div
            className={`col-span-3 flex flex-col items-center  justify-center gap-4`}
        >
            {Object.entries(stats).map(([key, value]) => {
                if (
                    type !== "league" ||
                    (type === "league" && key !== "knockout")
                ) {
                    let prob2;
                    if (stats2) prob2 = stats2[key as keyof IStats];
                    return (
                        <MatchStatsItem
                            key={key}
                            prob1={getProb(value)}
                            title={key.toUpperCase()}
                            prob2={prob2}
                            t2batfirst={t2batfirst}
                        />
                    );
                } else return null;
            })}
        </div>
    );
};
