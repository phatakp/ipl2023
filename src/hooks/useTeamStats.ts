import { useQuery } from "react-query";
import { getTeamStats } from "../services/stats";

export const useTeamStats = (matchNum: number) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["teamStats", matchNum],
        queryFn: () => getTeamStats(matchNum),
    });

    return { isLoading, isError, error, data };
};
