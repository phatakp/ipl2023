import { IMatch } from "interfaces/matches";

export const MatchListDate = ({ match }: { match: IMatch }) => {
    const time = new Date(match.date).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const date = new Date(match.date).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return (
        <div className="flex flex-col justify-start">
            <div className="text-xs">{time} IST</div>
            <div className="text-sm font-semibold uppercase tracking-wide sm:text-lg">
                <em>
                    {match.type === "league"
                        ? `Match ${match.num}`
                        : match.type}
                </em>{" "}
                | <em>{date}</em>
            </div>
        </div>
    );
};
