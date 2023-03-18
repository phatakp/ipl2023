import { MatchCarousel } from "features/DashboardPage/MatchCarousel";
import { TeamStandings } from "features/DashboardPage/TeamStandings";
import { UserPredictions } from "features/DashboardPage/UserPredictions";
import { UserStandings } from "features/DashboardPage/UserStandings";
import { useAuthUser } from "hooks/useAuthUser";
import { useLoader } from "hooks/useLoader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Profile } from "./Profile";

export const DashboardPage = () => {
    const { isLoading, isError, error, data: user } = useAuthUser();
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
        <div className="mt-16 w-screen">
            <Profile user={user} />
            <MatchCarousel />
            <div className="mt-2 grid gap-2 md:grid-cols-2 md:gap-4">
                <UserStandings />
                <TeamStandings />
                <UserPredictions />
            </div>
        </div>
    );
};
