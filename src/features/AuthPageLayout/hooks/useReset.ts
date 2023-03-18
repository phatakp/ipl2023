import { IResetPwdData } from "interfaces/auth";
import { IAPIError } from "interfaces/error";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUserPwd } from "services/auth";

export const useReset = () => {
    const navigate = useNavigate();

    const { mutate: resetUser, isLoading } = useMutation(
        (resetData: IResetPwdData) => resetUserPwd(resetData),
        {
            onSuccess: () => {
                //  query.refetch();
                toast.success("Password successfully reset");
                navigate("/auth/login");
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

    return { resetUser, isLoading };
};
