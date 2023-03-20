import { Form } from "components/Form";
import { useDouble } from "hooks/useDouble";
import { useLoader } from "hooks/useLoader";
import { usePrediction } from "hooks/usePrediction";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const DoubleForm = () => {
    const { matchNum } = useParams();
    const { doubleUserPrediction, isLoading } = useDouble();
    const {
        isUserPredLoading,
        isError,
        error,
        data: userPred,
    } = usePrediction(Number(matchNum));

    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isLoading || isUserPredLoading);
    }, [isLoading, isUserPredLoading, setLoader]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
        return null;
    }

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        doubleUserPrediction(userPred?.id);
    };

    if (!isUserPredLoading && !userPred) {
        toast.error("No Prediction for double play");
        return null;
    }

    return (
        <Form
            title="Play Double"
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
            <div>Are you sure you want to play double?</div>
        </Form>
    );
};
