import { useAuthContext } from "context/AuthContext";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { getUsers } from "services/auth";

export const usePlayers = () => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const token = state?.token?.access ?? cookies.token;

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["users", token],
        queryFn: () => getUsers(token),
    });
    return { isLoading, isError, error, data };
};
