import { Pagination } from "components/Pagination";
import { PredictionRow } from "features/MatchDetailPage/MatchDetail/MatchPredictions/PredictionRow";
import { useLoader } from "hooks/useLoader";
import { useUserPredictions } from "hooks/useUserPredictions";
import { IPred } from "interfaces/predictions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserPredictions = () => {
    const [page, setPage] = useState(1);
    const { isLoading, isError, error, data: userPreds } = useUserPredictions();

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

    const total = userPreds?.length;
    let end = page * 10;
    const start = end - 9;
    if (end > total) end = total;
    const preds = userPreds
        ?.sort((a: IPred, b: IPred) => b?.match?.num - a?.match?.num)
        .slice(start - 1, end);

    const prevClicked = () => setPage((prev) => prev - 1);
    const nextClicked = () => setPage((prev) => prev + 1);

    return (
        <div className="bg-darkblue container mx-auto p-4 md:col-span-2">
            <h1 className="mx-2 mb-4 rounded py-1 text-center text-xl font-bold text-white">
                My Predictions
            </h1>

            <div className="relative overflow-x-auto shadow-md">
                <div className="mx-2 mt-4 grid grid-cols-10 items-center gap-2 px-2 text-left text-sm uppercase text-gray-100 sm:grid-cols-8 md:grid-cols-9">
                    <div className="font-bold">#</div>
                    <div className="col-span-3 sm:col-span-2">Match</div>
                    <div className="col-span-2 text-center sm:col-span-1 md:text-left">
                        Team
                    </div>
                    <div className="col-span-2 text-right sm:col-span-1">
                        Stake
                    </div>
                    <div className="col-span-2 text-right sm:col-span-1">
                        Result
                    </div>
                    <div className="hidden text-center md:flex">Status</div>
                    <div className="hidden text-center sm:col-span-2 sm:flex">
                        Time
                    </div>
                </div>
                {preds?.map((pred: IPred) => (
                    <PredictionRow key={pred.id} pred={pred} user={true} />
                ))}
            </div>
            <Pagination
                start={start}
                end={end}
                total={total}
                prevClicked={prevClicked}
                nextClicked={nextClicked}
            />
        </div>
    );
};
