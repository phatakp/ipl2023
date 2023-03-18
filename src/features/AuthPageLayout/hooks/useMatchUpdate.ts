import { useAuthContext } from "context/AuthContext";
import { useModal } from "context/ModalContext";
import { IAPIError } from "interfaces/error";
import { IMatchChangeData } from "interfaces/matches";
import useCookies from "react-cookie/cjs/useCookies";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { updateMatchData } from "services/matches";

export const useMatchUpdate = () => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const client = useQueryClient();
    const { closeModal } = useModal();

    const { mutate: updateMatch, isLoading } = useMutation(
        (matchData: IMatchChangeData) =>
            updateMatchData(state?.token?.access ?? cookies.token, matchData),
        {
            onSuccess: () => {
                client.resetQueries();
                toast.success("Match updated successfully");
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

    return { updateMatch, isLoading };
};
