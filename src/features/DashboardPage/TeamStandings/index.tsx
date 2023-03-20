import { AnimatedComponent } from "components/AnimatedComponent";
import { useLoader } from "hooks/useLoader";
import { useTeams } from "hooks/useTeams";
import { ITeam } from "interfaces/teams";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TeamRow } from "./TeamRow";

export const TeamStandings = () => {
    const { isLoading, isError, error, data: teamList } = useTeams();
    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading, setLoader]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
        return null;
    }
    return (
        <AnimatedComponent>
            <div className="bg-darkblue container mx-auto p-4">
                <h1 className="mx-2 mb-4 rounded py-1 text-center text-xl font-bold text-white">
                    Team Standings
                </h1>

                <div className="relative overflow-x-auto shadow-md">
                    <div className="mx-2 mt-4 grid grid-cols-5 items-center gap-2 px-2 text-left text-sm uppercase text-gray-100">
                        <div className="col-span-2">Team</div>
                        <div className="text-right">Pld</div>
                        <div className="text-right">Net RR</div>
                        <div className="text-right">Pts</div>
                    </div>
                    {teamList?.map((team: ITeam) => (
                        <TeamRow key={team.id} team={team} />
                    ))}
                </div>
            </div>
        </AnimatedComponent>
    );
};
