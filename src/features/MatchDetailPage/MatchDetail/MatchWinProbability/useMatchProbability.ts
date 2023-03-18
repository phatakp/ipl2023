import { useQuery } from "react-query";
import { getMatchWinProbability } from "services/matches";

export const useMatchProbability = (matchNum: number) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["matchProbability", matchNum],
        queryFn: () => getMatchWinProbability(matchNum),
    });
    return { isLoading, isError, error, data };
};
