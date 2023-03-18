import { ModalForm } from "components/ModalForm";
import { NavButton } from "components/NavButton";
import { useAuthContext } from "context/AuthContext";
import { useModal } from "context/ModalContext";
import { DoubleForm } from "features/AuthPageLayout/forms/DoubleForm";
import { MatchUpdateForm } from "features/AuthPageLayout/forms/MatchUpdateForm";
import { PredictionForm } from "features/AuthPageLayout/forms/PredictionForm";
import { IMatch } from "interfaces/matches";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MatchDetailNavButtons = ({ match }: { match: IMatch }) => {
    const [modal, setModal] = useState("");
    const { state } = useAuthContext();
    const navigate = useNavigate();
    const { openModal } = useModal();

    const prevClicked = () => navigate(`/matches/${match?.num - 1}/`);
    const nextClicked = () => navigate(`/matches/${match?.num + 1}/`);
    const buttonClicked = (e: any) => {
        setModal(e.target.outerText);
        openModal();
    };

    return (
        <div className="bg-darkblue flex w-screen flex-row items-center justify-center gap-4 py-2">
            {match?.num !== 1 && (
                <NavButton
                    type="prev"
                    onClicked={prevClicked}
                    disabled={false}
                />
            )}

            {state?.isAuthenticated && match?.scheduled && !match?.started && (
                <button
                    className="btn-orange rounded px-4 py-2"
                    onClick={buttonClicked}
                >
                    Predict
                </button>
            )}

            {state?.isAuthenticated &&
                state?.user?.is_site_admin &&
                match?.scheduled && (
                    <button
                        className="btn-pink rounded px-4 py-2"
                        onClick={buttonClicked}
                    >
                        Update
                    </button>
                )}

            {state?.isAuthenticated &&
                state?.user &&
                state?.user?.doubles > 0 &&
                match?.type === "league" &&
                match?.started &&
                !match?.double_cutoff_passed &&
                !match?.double && (
                    <button
                        className="btn-pink rounded px-4 py-2"
                        onClick={buttonClicked}
                    >
                        Play Double
                    </button>
                )}

            {match?.type !== "final" && (
                <NavButton
                    type="next"
                    onClicked={nextClicked}
                    disabled={false}
                />
            )}
            <ModalForm
                title={
                    modal === "Predict"
                        ? "Match Prediction"
                        : modal === "Update"
                        ? "Update Match"
                        : "Double Prediction"
                }
            >
                {modal === "Predict" ? (
                    <PredictionForm />
                ) : modal === "Update" ? (
                    <MatchUpdateForm />
                ) : (
                    <DoubleForm />
                )}
            </ModalForm>
        </div>
    );
};
