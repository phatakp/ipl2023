import { useLoader } from "hooks/useLoader";
import { IMatchHistory } from "interfaces/history";
import { IMatch } from "interfaces/matches";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { RecentMeetingItem } from "./RecentMeetingItem";
import { useMatchHistory } from "./useMatchHistory";

export const RecentMeetings = ({ match }: { match: IMatch }) => {
    const {
        isLoading,
        isError,
        error,
        data: matchHistory,
    } = useMatchHistory(match);

    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading, setLoader]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
        return null;
    }

    return (
        <div className="section">
            <h1 className="text-center text-xl font-bold">Recent Meetings</h1>

            <div className="container mx-auto">
                {matchHistory?.map((item: IMatchHistory) => (
                    <RecentMeetingItem key={item.id} match={item} />
                ))}
            </div>
        </div>
    );
};
