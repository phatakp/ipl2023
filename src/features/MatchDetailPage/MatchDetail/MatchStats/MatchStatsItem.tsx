import { getProb } from "utilities/getProb";

interface IMatchStatsItem {
    prob1: number;
    title: string;
    prob2?: number;
    t2batfirst?: number;
}
export const MatchStatsItem = ({
    prob1,
    title,
    prob2,
    t2batfirst,
}: IMatchStatsItem) => {
    if (!(!!prob2 || !!t2batfirst)) return null;

    const prob =
        !!t2batfirst && title === "BATFIRST"
            ? getProb(t2batfirst)
            : !!t2batfirst
            ? 100 - prob1
            : !!prob2
            ? getProb(prob2)
            : 0;

    return (
        <div className={`grid w-full grid-cols-3 gap-2 md:grid-cols-5`}>
            <div
                className={`flex w-full flex-row flex-nowrap items-center justify-end bg-gray-300 md:col-span-2`}
            >
                <div
                    className={`h-full bg-green-500 text-center text-sm text-white`}
                    style={{ width: `${prob1}%` }}
                >
                    {prob1}%
                </div>
            </div>
            <span className="text-center text-xs sm:text-sm">{title}</span>
            <div
                className={`flex w-full flex-row flex-nowrap items-center justify-start bg-gray-300 md:col-span-2`}
            >
                <div
                    className={`h-full bg-green-500 text-center text-sm text-white`}
                    style={{ width: `${prob}%` }}
                >
                    {prob}%
                </div>
            </div>
        </div>
    );
};
