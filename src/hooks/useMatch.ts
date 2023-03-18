import { useQuery } from "react-query";
import { getMatchByNum } from "../services/matches";

export const useMatch = (matchNum: number | undefined) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["match", matchNum],
        queryFn: () => getMatchByNum(matchNum),
    });
    return { isLoading, isError, error, data };
};
