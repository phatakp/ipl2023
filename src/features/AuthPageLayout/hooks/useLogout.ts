import { useAuthContext } from "context/AuthContext";
import useCookies from "react-cookie/cjs/useCookies";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "services/auth";

export const useLogout = () => {
    const { setNotAuthenticated, state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    const { mutate: logoutUser, isLoading } = useMutation(
        () => logout(state?.token?.access ?? cookies.token),
        {
            onSuccess: () => {
                //  query.refetch();
                setNotAuthenticated();
                toast.success("You are successfully logged out");
                navigate("/");
            },
            onError: (error: any) => {
                setNotAuthenticated();
            },
        }
    );

    return { logoutUser, isLoading };
};
