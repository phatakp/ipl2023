import { useAuthContext } from "context/AuthContext";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { getUserPredictions } from "services/matches";

export const useUserPredictions = () => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const token = state?.token?.access ?? cookies.token;

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["userPredictions", token],
        queryFn: () => getUserPredictions(token),
    });

    return { isLoading, isError, error, data };
};
