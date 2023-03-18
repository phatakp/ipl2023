import { Form } from "components/Form";
import { useMatchContext } from "context/MatchContext";
import { useLoader } from "hooks/useLoader";
import { useMatch } from "hooks/useMatch";
import { usePrediction } from "hooks/usePrediction";
import { IPredictionData } from "interfaces/predictions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const PredictionForm = () => {
    const { item } = useMatchContext();
    const { matchNum } = useParams();
    const num = item ? item.num : !!matchNum ? Number(matchNum) : undefined;

    const {
        isLoading: isMatchLoading,
        isError: isMatchError,
        error: matchError,
        data: match,
    } = useMatch(num);

    const {
        isLoading,
        isUserPredLoading,
        isError,
        error,
        data: userPred,
        addPrediction,
        updatePrediction,
    } = usePrediction(num);

    const [formData, setFormData] = useState<IPredictionData>({
        id: 0,
        matchNum: num ?? 0,
        amount: userPred?.amount ?? item?.min_bet ?? match?.min_bet ?? 0,
        teamName: userPred?.team?.shortname ?? "",
    });

    const { teamName, amount } = formData;

    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isLoading || isUserPredLoading || isMatchLoading);
        setFormData({
            ...formData,
            id: userPred?.id ?? 0,
            amount: userPred?.amount ?? item?.min_bet ?? match?.min_bet,
            teamName: userPred?.team?.shortname ?? "",
        });
    }, [isUserPredLoading]);

    if (isError || isMatchError) {
        const message = isError
            ? (error as any)?.response?.data?.errors?.[0].detail
            : (matchError as any)?.response?.data?.errors?.[0].detail ??
              "Internal Server Error";
        toast.error(message);
        return null;
    }

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({
            ...formData,
            [e.currentTarget.name]:
                e.currentTarget.name === "teamName"
                    ? e.currentTarget.value
                    : Number(e.currentTarget.value),
        });

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (userPred) updatePrediction(formData);
        else {
            const { id, ...rest } = formData;
            addPrediction(rest);
        }
    };

    return (
        <Form
            title={`Match ${num} Prediction`}
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
            <div className="w-full">
                <label
                    htmlFor="amount"
                    className="mb-2 inline-flex items-center text-left font-medium text-gray-900"
                >
                    <span className="mr-4">Amount</span>
                    <span className="text-xl font-semibold">{amount}</span>
                </label>
                <input
                    name="amount"
                    type="range"
                    min={`${match?.min_bet ?? item?.min_bet}`}
                    max={`${(match?.min_bet ?? item?.min_bet) * 5}`}
                    value={amount}
                    step={
                        match?.type === "league" || item?.type === "league"
                            ? "5"
                            : "10"
                    }
                    className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-RR"
                    onChange={onFieldChange}
                />
            </div>

            <div className="w-full">
                <h3 className="mb-2 inline-flex items-center text-left font-medium text-gray-900">
                    <span className="mr-4">Team</span>
                    <span className="text-xl font-semibold">{teamName}</span>
                </h3>
                <div className="flex w-full items-center justify-center rounded bg-white text-sm font-medium text-gray-900 shadow shadow-gray-600">
                    <button
                        className={`w-full border-b  sm:border-b-0 sm:border-r ${
                            match?.team1?.shortname === teamName ||
                            item?.team1?.shortname === teamName
                                ? `bg-${match?.team1?.shortname}`
                                : "border-gray-800"
                        }`}
                    >
                        <div className="flex items-center">
                            <img
                                src={`${
                                    process.env.REACT_APP_IMAGE_URL
                                }/teamLogos/${
                                    match?.team1?.shortname ??
                                    item?.team1?.shortname
                                }.png`}
                                alt="Team Logo"
                                className="mx-4 h-12 w-12"
                            />
                            <input
                                id={
                                    match?.team1?.shortname ??
                                    item?.team1?.shortname
                                }
                                type="radio"
                                value={
                                    match?.team1?.shortname ??
                                    item?.team1?.shortname ??
                                    ""
                                }
                                checked={
                                    match?.team1?.shortname === teamName ||
                                    item?.team1?.shortname === teamName
                                }
                                name="teamName"
                                className="h-4 w-4 border-gray-300 bg-gray-100  md:h-6 md:w-6"
                                onChange={onFieldChange}
                            />
                        </div>
                    </button>
                    <button
                        className={`w-full border-b sm:border-b-0 sm:border-r ${
                            match?.team2?.shortname === teamName ||
                            item?.team2?.shortname === teamName
                                ? `bg-${match?.team2?.shortname}`
                                : "border-gray-800"
                        }`}
                    >
                        <div className="flex flex-row items-center justify-end">
                            <input
                                id={
                                    match?.team2?.shortname ||
                                    item?.team2?.shortname
                                }
                                type="radio"
                                value={
                                    match?.team2?.shortname ??
                                    item?.team2?.shortname ??
                                    ""
                                }
                                checked={
                                    match?.team2?.shortname === teamName ||
                                    item?.team2?.shortname === teamName
                                }
                                name="teamName"
                                className="h-4 w-4 border-gray-300 bg-gray-100  md:h-6 md:w-6 "
                                onChange={onFieldChange}
                            />
                            <img
                                src={`${
                                    process.env.REACT_APP_IMAGE_URL
                                }/teamLogos/${
                                    match?.team2?.shortname ??
                                    item?.team2?.shortname
                                }.png`}
                                alt="Team Logo"
                                className="mx-4 h-12 w-12 "
                            />
                        </div>
                    </button>
                </div>
            </div>
        </Form>
    );
};
