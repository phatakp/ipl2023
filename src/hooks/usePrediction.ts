import { useAuthContext } from "context/AuthContext";
import { useModal } from "context/ModalContext";
import { IAPIError } from "interfaces/error";
import { IPredictionData } from "interfaces/predictions";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
    addUserPrediction,
    getUserPredictionForMatch,
    updateUserPrediction,
} from "services/matches";

export const usePrediction = (matchNum?: number) => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const token = state?.token?.access ?? cookies.token;
    const { closeModal } = useModal();
    const client = useQueryClient();

    const {
        isLoading: isUserPredLoading,
        isError,
        error,
        data,
    } = useQuery({
        queryKey: ["matchUserPrediction", matchNum, token],
        queryFn: () => getUserPredictionForMatch(token, matchNum!),
        enabled: !!matchNum,
    });

    const { mutate: addPrediction, isLoading } = useMutation(
        (predData: IPredictionData) => addUserPrediction(token, predData),
        {
            onSuccess: (data) => {
                client.invalidateQueries("matchUserPrediction");
                client.invalidateQueries("matchPredictions");
                client.invalidateQueries("userPredictions");
                toast.success("Prediction Added successfully");
                closeModal();
            },
            onError: (error: any) => {
                if (Array.isArray((error as any).response.data.errors)) {
                    (error as any).response.data.errors.forEach(
                        (el: IAPIError) => toast.error(el.detail)
                    );
                } else {
                    toast.error((error as any).response.data.errors[0].detail);
                }
            },
        }
    );

    const { mutate: updatePrediction } = useMutation(
        (predData: IPredictionData) => updateUserPrediction(token, predData),
        {
            onSuccess: (data) => {
                client.invalidateQueries("matchUserPrediction");
                client.invalidateQueries("matchPredictions");
                client.invalidateQueries("userPredictions");
                toast.success("Prediction Updated successfully");
                closeModal();
            },
            onError: (error: any) => {
                if (Array.isArray((error as any).response.data.errors)) {
                    (error as any).response.data.errors.forEach(
                        (el: IAPIError) => toast.error(el.detail)
                    );
                } else {
                    toast.error((error as any).response.data.errors[0].detail);
                }
            },
        }
    );

    return {
        addPrediction,
        updatePrediction,
        isLoading,
        isUserPredLoading,
        isError,
        error,
        data,
    };
};
