import { AnimatedComponent } from "components/AnimatedComponent";
import { ModalForm } from "components/ModalForm";
import { useAuthContext } from "context/AuthContext";
import { useMatchContext } from "context/MatchContext";
import { useModal } from "context/ModalContext";
import { PredictionForm } from "features/AuthPageLayout/forms/PredictionForm";
import { IMatch } from "interfaces/matches";
import { MatchListDate } from "./MatchListDate";
import { MatchListDetail } from "./MatchListDetail";
import { MatchListTeams } from "./MatchListTeams";

export const MatchListItem = ({ match }: { match: IMatch }) => {
    const { setItem } = useMatchContext();
    const { openModal } = useModal();
    const { state } = useAuthContext();

    const predictClicked = (m: IMatch) => {
        setItem(m);
        openModal();
    };

    return (
        <AnimatedComponent type="slide">
            <ModalForm title="Match Prediction">
                <PredictionForm />
            </ModalForm>
            <div className="bg-slate-100 container relative mx-auto my-6 overflow-hidden rounded border-2 border-t border-blue-900 border-t-gray-200 p-2 shadow-lg shadow-blue-900">
                <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/circle-pattern.png`}
                    alt=""
                    className="absolute -right-1/4 -top-12 -z-10 md:top-0 md:right-0"
                />
                <div className="flex flex-col p-4">
                    <div className="flex flex-row items-center justify-between  border-b-2 border-gray-200 pb-2">
                        <MatchListDate match={match} />

                        {state?.isAuthenticated &&
                            match.scheduled &&
                            !match.started && (
                                <button
                                    className="hidden rounded border border-blue-900 bg-gray-800 p-2 text-sm font-bold uppercase text-white md:flex md:cursor-pointer md:px-4 md:text-base md:hover:bg-gray-700"
                                    onClick={() => predictClicked(match)}
                                >
                                    Predict
                                </button>
                            )}
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:items-center md:py-4">
                        <MatchListTeams match={match} />
                        <MatchListDetail match={match} />
                        <div className="flex flex-row items-center justify-between">
                            <div className="font-semibold uppercase text-blue-900 sm:text-lg sm:font-bold md:pl-4">
                                {match.result}
                            </div>

                            {state?.isAuthenticated &&
                                match.scheduled &&
                                !match.started && (
                                    <button
                                        className="cursor-pointer rounded border border-blue-900 bg-gray-800 p-2 text-sm font-bold uppercase text-white hover:bg-gray-700
                            md:hidden md:px-4 md:text-lg"
                                        onClick={() => predictClicked(match)}
                                    >
                                        Predict
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedComponent>
    );
};
