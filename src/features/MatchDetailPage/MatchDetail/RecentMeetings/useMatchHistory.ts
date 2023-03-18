import { IMatch } from "interfaces/matches";
import { useQuery } from "react-query";
import { getTeamHistory } from "services/stats";

export const useMatchHistory = (match: IMatch) => {
    const team1 = match.team1.shortname;
    const team2 = match.team2.shortname;
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["matchHistory", team1, team2],
        queryFn: () => getTeamHistory(team1, team2),
    });
    return { isLoading, isError, error, data };
};
