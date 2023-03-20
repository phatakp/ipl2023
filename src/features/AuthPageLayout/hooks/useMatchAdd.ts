import { useAuthContext } from "context/AuthContext";
import { useModal } from "context/ModalContext";
import { IAPIError } from "interfaces/error";
import { IMatchAddData } from "interfaces/matches";
import useCookies from "react-cookie/cjs/useCookies";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addMatch } from "services/matches";

export const useMatchAdd = () => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const client = useQueryClient();
    const { closeModal } = useModal();

    const { mutate: addNewMatch, isLoading } = useMutation(
        (matchData: IMatchAddData) =>
            addMatch(state?.token?.access ?? cookies.token, matchData),
        {
            onSuccess: () => {
                client.invalidateQueries("matches");
                toast.success("Match Added successfully");
                closeModal();
            },
            onError: (error: any) => {
                if (Array.isArray((error as any).response.data?.errors)) {
                    (error as any).response.data?.errors?.forEach(
                        (el: IAPIError) => toast.error(el.detail)
                    );
                } else {
                    toast.error(
                        (error as any).response.data?.errors?.[0]?.detail ??
                            "Internal Server Error"
                    );
                }
            },
        }
    );

    return { addNewMatch, isLoading };
};
