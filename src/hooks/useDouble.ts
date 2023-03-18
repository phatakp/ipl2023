import { useAuthContext } from "context/AuthContext";
import { useModal } from "context/ModalContext";
import { IAPIError } from "interfaces/error";
import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { doublePrediction } from "services/matches";

export const useDouble = () => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const token = state?.token?.access ?? cookies.token;
    const client = useQueryClient();
    const { closeModal } = useModal();

    const { mutate: doubleUserPrediction, isLoading } = useMutation(
        (id: number) => doublePrediction(token, id),
        {
            onSuccess: (data) => {
                client.invalidateQueries("matchUserPrediction");
                client.invalidateQueries("matchPredictions");
                client.invalidateQueries("userPredictions");
                client.invalidateQueries("match");
                toast.success("Prediction Doubled successfully");
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

    return { doubleUserPrediction, isLoading };
};
