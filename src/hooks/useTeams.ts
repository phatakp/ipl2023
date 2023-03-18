import { useQuery } from "react-query";
import { getTeams } from "../services/teams";

export const useTeams = () => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["teams"],
        queryFn: getTeams,
    });

    return { isLoading, isError, error, data };
};
