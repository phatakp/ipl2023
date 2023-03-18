import { useAuthContext } from "context/AuthContext";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { getMatchPredictions } from "services/matches";

export const useMatchPredictions = (matchNum: number) => {
    const { state } = useAuthContext();
    const [cookies] = useCookies(["token"]);
    const token = state?.token?.access ?? cookies.token;

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["matchPredictions", matchNum, token],
        queryFn: () => getMatchPredictions(token, matchNum),
    });

    return { isLoading, isError, error, data };
};
