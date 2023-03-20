import { AnimatedComponent } from "components/AnimatedComponent";
import { useLoader } from "hooks/useLoader";
import { useMatches } from "hooks/useMatches";
import { IMatch } from "interfaces/matches";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { MatchListItem } from "./MatchListItem";

export const MatchListPage = () => {
    const [page, setPage] = useState<"schedule" | "result">("schedule");

    const setPageResult = () => setPage("result");
    const setPageSchedule = () => setPage("schedule");

    const { isLoading, isError, error, data: matchList } = useMatches();

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

    const schedule = matchList
        ?.filter((match: IMatch) => match.scheduled)
        .sort((a: IMatch, b: IMatch) => a.num > b.num);

    const results = matchList
        ?.filter((match: IMatch) => !match.scheduled)
        .sort((a: IMatch, b: IMatch) => b.num > a.num);

    const matches = page === "schedule" ? schedule : results;

    return (
        <>
            <div
                className={`relative mt-16 min-h-screen w-screen bg-cover bg-center bg-no-repeat p-2`}
                style={{
                    backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}/scheduleBg.jpg')`,
                }}
            >
                <div className="container mx-auto">
                    <div className="mt-4 mb-8 flex flex-row items-center">
                        <button
                            className={`btn-orange rounded-l border-2 border-r border-blue-900 border-r-white p-2 uppercase  md:px-4 ${
                                page === "schedule"
                                    ? "font-bold text-white md:text-lg"
                                    : "text-sm text-gray-300"
                            } `}
                            onClick={setPageSchedule}
                        >
                            Schedule
                        </button>
                        <button
                            className={`btn-orange rounded-r border-2 border-l border-blue-900 border-l-white p-2  uppercase  md:px-4 ${
                                page === "result"
                                    ? "font-bold text-white md:text-lg"
                                    : "text-sm text-gray-300"
                            } `}
                            onClick={setPageResult}
                        >
                            Results
                        </button>
                    </div>
                    {matches?.length === 0 && (
                        <AnimatedComponent type="slide">
                            <div className="bg-slate-100 container relative mx-auto my-6 overflow-hidden rounded border-2 border-t border-blue-900 border-t-gray-200 p-6 text-xl shadow-lg shadow-blue-900">
                                No Matches to display
                            </div>
                        </AnimatedComponent>
                    )}
                    {matches?.map((item: IMatch) => (
                        <MatchListItem key={item.id} match={item} />
                    ))}
                </div>
            </div>
            <Outlet />
        </>
    );
};
