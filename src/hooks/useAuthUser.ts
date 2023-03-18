import { useAuthContext } from "context/AuthContext";
import { IUser } from "interfaces/auth";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { getUser } from "services/auth";

export const useAuthUser = () => {
    const { state, setUserData } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const token = state?.token?.access ?? cookies.token;

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["user", token],
        queryFn: () => getUser(token),
        onSuccess: (data: IUser) => setUserData(data),
    });
    return { isLoading, isError, error, data };
};
