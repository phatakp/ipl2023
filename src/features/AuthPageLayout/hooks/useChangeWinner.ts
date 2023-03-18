import { useAuthContext } from "context/AuthContext";
import { IChangeWinnerData } from "interfaces/auth";
import { IAPIError } from "interfaces/error";
import useCookies from "react-cookie/cjs/useCookies";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changeWinner } from "services/auth";

export const useChangeWinner = () => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const client = useQueryClient();
    const navigate = useNavigate();

    const { mutate: changeWinnerUser, isLoading } = useMutation(
        (winnerData: IChangeWinnerData) =>
            changeWinner(state?.token?.access ?? cookies.token, winnerData),
        {
            onSuccess: () => {
                client.invalidateQueries("user");
                toast.success("IPL Winner updated successfully");
                navigate("/dashboard");
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

    return { changeWinnerUser, isLoading };
};
