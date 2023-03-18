import { AnimatedComponent } from "components/AnimatedComponent";
import { IMatchHistory } from "interfaces/history";
import { RecentMeetingsTeam } from "./RecentMeetingsTeam";

export const RecentMeetingItem = ({ match }: { match: IMatchHistory }) => {
    const date = new Date(match.date).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return (
        <AnimatedComponent type="slide">
            <div className="mt-6 flex w-full flex-col items-center justify-center">
                <span className="text-xs text-gray-600">{date}</span>
                <span className="text-sm font-semibold text-gray-800">
                    {match?.result}
                </span>
                <div className="mt-2 grid w-full max-w-3xl grid-cols-2 gap-8 border-b border-t border-gray-200 bg-gray-100">
                    <RecentMeetingsTeam
                        team={match?.team1}
                        type="l"
                        winner={match?.winner}
                    />
                    <RecentMeetingsTeam
                        team={match?.team2}
                        type="r"
                        winner={match?.winner}
                    />
                </div>
            </div>
        </AnimatedComponent>
    );
};
