import { useQuery } from "react-query";
import { getMatches } from "../services/matches";

export const useMatches = () => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["matches"],
        queryFn: getMatches,
    });
    return { isLoading, isError, error, data };
};
