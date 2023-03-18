import { AnimatedComponent } from "components/AnimatedComponent";
import { useAuthContext } from "context/AuthContext";
import { useLoader } from "hooks/useLoader";
import { useMatchPredictions } from "hooks/useMatchPredictions";
import { IMatch } from "interfaces/matches";
import { IPred } from "interfaces/predictions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { PredictionRow } from "./PredictionRow";

export const MatchPredictions = ({ match }: { match: IMatch }) => {
    const { state } = useAuthContext();
    const {
        isLoading,
        isError,
        error,
        data: matchPreds,
    } = useMatchPredictions(match?.num);

    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
        return null;
    }

    return (
        <AnimatedComponent type="slide">
            <div className="bg-darkblue container mx-auto p-4">
                <h1 className="mx-2 mb-4 rounded py-1 text-center text-xl font-bold text-white">
                    Match Predictions
                </h1>

                <div className="relative overflow-x-auto shadow-md">
                    <div className="mx-2 mt-4 grid grid-cols-10 items-center gap-2 px-2 text-left text-sm uppercase text-gray-100 sm:grid-cols-8 md:grid-cols-9">
                        <div className="font-bold">#</div>
                        <div className="col-span-3 sm:col-span-2">Player</div>
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
                    {matchPreds?.map((pred: IPred, index: number) => (
                        <PredictionRow
                            key={pred.id}
                            pred={pred}
                            index={index + 1}
                            match={match}
                            currUserId={state?.user?.id}
                        />
                    ))}
                    {!matchPreds && (
                        <div className="col-span-10 sm:col-span-8 md:col-span-9">
                            No Predictions Yet
                        </div>
                    )}
                </div>
            </div>
        </AnimatedComponent>
    );
};
