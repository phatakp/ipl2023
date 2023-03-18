import { useAuthContext } from "context/AuthContext";
import { ILoginData } from "interfaces/auth";
import { IAPIError } from "interfaces/error";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "services/auth";

export const useLogin = () => {
    const { setTokenData, setNotAuthenticated, setUserData } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from =
        ((location.state as any)?.from.pathname as string) || "/dashboard";

    const { mutate: loginUser, isLoading } = useMutation(
        (loginData: ILoginData) => login(loginData),
        {
            onSuccess: (data) => {
                //  query.refetch();
                setTokenData(data);
                toast.success("You are successfully logged in");
                navigate(from);
            },
            onError: (error: any) => {
                setNotAuthenticated();
                if (Array.isArray((error as any)?.response?.data?.errors)) {
                    (error as any)?.response?.data?.errors?.forEach(
                        (el: IAPIError) => toast.error(el?.detail)
                    );
                } else {
                    toast.error(
                        (error as any)?.response?.data?.errors?.[0]?.detail
                    );
                }
            },
        }
    );

    return { loginUser, isLoading };
};
