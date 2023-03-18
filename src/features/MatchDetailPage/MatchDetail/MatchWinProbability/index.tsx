import { AnimatedComponent } from "components/AnimatedComponent";
import { useLoader } from "hooks/useLoader";
import { IMatch } from "interfaces/matches";
import { ITeamForm } from "interfaces/teams";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMatchProbability } from "./useMatchProbability";

export const MatchWinProbability = ({ match }: { match: IMatch }) => {
    const {
        isLoading,
        isError,
        error,
        data: matchProbability,
    } = useMatchProbability(match?.num);

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

    let t1form, t2form;

    if (match?.form) {
        t1form = match.form.team1;
        t2form = match.form.team2;
    }

    return (
        <AnimatedComponent type="slide">
            <div className="section">
                <h1 className="text-center text-xl font-bold">
                    Win Probability
                </h1>
                <div className="flex w-full flex-row flex-nowrap items-center justify-center gap-4 md:mx-auto md:max-w-5xl">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${match?.team1?.shortname}.png`}
                            alt="Team Logo"
                            className="h-16 w-16 md:h-20 md:w-20"
                        />
                        <div className={`flex items-center justify-evenly`}>
                            {t1form?.map((item: ITeamForm, index) => (
                                <span
                                    key={index}
                                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                        item.winner
                                            ? item.winner ===
                                              match?.team1?.shortname
                                                ? "bg-green-500"
                                                : "bg-red-600"
                                            : "bg-gray-500"
                                    } text-xs text-white`}
                                >
                                    {item.winner
                                        ? item.winner ===
                                          match?.team1?.shortname
                                            ? "W"
                                            : "L"
                                        : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-full flex-row flex-nowrap items-center justify-center rounded bg-transparent">
                        <div
                            className={`h-full bg-${match?.team1?.shortname} rounded-l text-center text-white`}
                            style={{ width: `${matchProbability?.team1}%` }}
                        >
                            {matchProbability?.team1}%
                        </div>
                        <div
                            className={`h-full bg-${match?.team2?.shortname} rounded-r text-center text-white`}
                            style={{ width: `${matchProbability?.team2}%` }}
                        >
                            {matchProbability?.team2}%
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${match?.team2?.shortname}.png`}
                            alt="Team Logo"
                            className="h-16 w-16 md:h-20 md:w-20"
                        />
                        <div
                            className={`flex flex-row-reverse items-center justify-evenly`}
                        >
                            {t2form?.map((item: ITeamForm, index) => (
                                <span
                                    key={index}
                                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                        item.winner
                                            ? item.winner ===
                                              match?.team2?.shortname
                                                ? "bg-green-500"
                                                : "bg-red-600"
                                            : "bg-gray-500"
                                    } text-xs text-white`}
                                >
                                    {item.winner
                                        ? item.winner ===
                                          match?.team2?.shortname
                                            ? "W"
                                            : "L"
                                        : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedComponent>
    );
};
