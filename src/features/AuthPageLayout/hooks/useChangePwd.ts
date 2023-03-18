import { useAuthContext } from "context/AuthContext";
import { IChangePwdData } from "interfaces/auth";
import { IAPIError } from "interfaces/error";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changeUserPwd } from "services/auth";

export const useChangePwd = () => {
    const { state, setNotAuthenticated } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    const { mutate: changePwdUser, isLoading } = useMutation(
        (pwdData: IChangePwdData) =>
            changeUserPwd(state?.token?.access ?? cookies.token, pwdData),
        {
            onSuccess: () => {
                //  query.refetch();
                setNotAuthenticated();
                toast.success("Your password is changed. Please re-login");
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

    return { changePwdUser, isLoading };
};
