import { useLoader } from "hooks/useLoader";
import { useTeams } from "hooks/useTeams";
import { ITeam } from "interfaces/teams";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const TeamCircle = () => {
    const { isLoading, isError, error, data: teams } = useTeams();
    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
        return null;
    }

    return (
        <div className="mx-auto my-4 w-[20rem] text-center md:col-span-2 md:w-[35rem]">
            <span className="mb-8 font-monoton text-4xl font-extrabold text-pink-600">
                Indian &nbsp;&nbsp; Premier &nbsp;&nbsp; League &nbsp;&nbsp;
                2023
            </span>
            <div className="relative my-4 h-[20rem] w-full bg-gradient-radial md:h-[35rem] md:bg-gradient-radial-md">
                <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/ipl-trophy.png`}
                    className="absolute top-1/2 left-[55%] w-[10rem] -translate-x-1/2 -translate-y-1/2 md:w-[25rem]"
                />
                <div>
                    {teams &&
                        teams.map((team: ITeam, index: number) => (
                            <img
                                key={team.shortname}
                                className={`absolute h-16 w-16 animate-spin md:h-24 md:w-24 ${getClass(
                                    index
                                )}`}
                                src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${team.shortname}.png`}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

const getClass = (index: number) => {
    switch (index) {
        case 0:
            return "top-0 left-[40%]";
        case 1:
            return "top-[30%] right-0";
        case 2:
            return "top-[75%] left-[67%]";
        case 3:
            return "top-[31%] left-0";
        case 4:
            return "top-[76%] left-[13%]";
        case 5:
            return "top-[10%] left-[14%]";
        case 6:
            return "top-[10%] right-[14%]";
        case 7:
            return "bottom-[28%] left-[1%]";
        case 8:
            return "bottom-[28%] right-[1%]";
        case 9:
            return "bottom-0 left-[40%]";
        default:
            return "";
    }
};
