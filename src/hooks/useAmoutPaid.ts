import { useAuthContext } from "context/AuthContext";
import { useModal } from "context/ModalContext";
import { IAPIError } from "interfaces/error";
import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { userAmountPaid } from "services/auth";

export const useAmountPaid = () => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const token = state?.token?.access ?? cookies.token;
    const client = useQueryClient();
    const { closeModal } = useModal();

    const { mutate: userPaid, isLoading } = useMutation(
        ({ email, paid }: { email: string; paid: boolean }) =>
            userAmountPaid(token, email, paid),
        {
            onSuccess: (data) => {
                client.invalidateQueries("users");
                client.invalidateQueries("userPredictions");
                toast.success("User Paid successfully");
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

    return { userPaid, isLoading };
};
