import { useAuthContext } from "context/AuthContext";
import { MatchDetail } from "features/MatchDetailPage/MatchDetail";
import { MatchSelector } from "features/MatchDetailPage/MatchDetail/MatchSelector";
import { useMatchSelector } from "features/MatchDetailPage/MatchDetail/useMatchSelector";
import { MatchBannerDescription } from "features/MatchDetailPage/MatchDetailBanner/MatchBannerDescription";
import { MatchBannerTeams } from "features/MatchDetailPage/MatchDetailBanner/MatchBannerTeams";
import { MatchBannerTeam } from "features/MatchDetailPage/MatchDetailBanner/MatchBannerTeams/MatchBannerTeam";
import { MatchBannerTeamDescription } from "features/MatchDetailPage/MatchDetailBanner/MatchBannerTeams/MatchBannerTeam/MatchBannerTeamDescription";
import { MatchBannerTeamName } from "features/MatchDetailPage/MatchDetailBanner/MatchBannerTeams/MatchBannerTeam/MatchBannerTeamName";
import { useLoader } from "hooks/useLoader";
import { useMatch } from "hooks/useMatch";
import { useTeamStats } from "hooks/useTeamStats";
import { useEffect } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MatchHeadtoHead } from "./MatchDetail/MatchHeadtoHead";
import { MatchOverallStats } from "./MatchDetail/MatchOverallStats";
import { MatchPredictions } from "./MatchDetail/MatchPredictions";
import { MatchWinProbability } from "./MatchDetail/MatchWinProbability";
import { RecentMeetings } from "./MatchDetail/RecentMeetings";
import { MatchDetailBanner } from "./MatchDetailBanner";
import { MatchDetailNavButtons } from "./MatchDetailNavButtons";

export const MatchDetailPage = () => {
    const { matchNum } = useParams();
    const { state } = useAuthContext();

    const { statsPage, setPageToStats, setPageToPredictions } =
        useMatchSelector();

    const {
        isLoading: isMatchLoading,
        isError: isMatchError,
        error: matchError,
        data: match,
    } = useMatch(Number(matchNum!));

    const {
        isLoading: isStatsLoading,
        isError: isStatsError,
        error: statsError,
        data: stats,
    } = useTeamStats(Number(matchNum));

    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isMatchLoading || isStatsLoading);
    }, [isMatchLoading, isStatsLoading]);

    if (isMatchError || isStatsError) {
        const message = matchError
            ? (matchError as any)?.response?.data?.errors?.[0].detail ??
              "Internal Server Error"
            : (statsError as any)?.response?.data?.errors?.[0].detail ??
              "Internal Server Error";
        toast.error(message);
        return null;
    }

    const time = new Date(match?.date).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div
            className={`relative mt-20 flex w-screen flex-col items-center justify-center`}
        >
            <MatchDetailBanner>
                <MatchBannerDescription
                    type={match?.type}
                    num={match?.num}
                    venue={match?.venue}
                    dt={match?.date}
                />
                <div className="mt-4 text-sm font-bold uppercase md:text-xl">
                    {match?.result}{" "}
                    {match?.status === "scheduled" && ` @ ${time}`}
                </div>
                <MatchBannerTeams>
                    <MatchBannerTeam type="l">
                        <MatchBannerTeamName team={match?.team1} />
                        <MatchBannerTeamDescription
                            type="l"
                            winner={match?.team1.id === match?.winner?.id}
                            score={match?.t1score}
                        />
                    </MatchBannerTeam>
                    <span className="text-3xl font-bold text-pink-600 md:mx-8">
                        vs
                    </span>
                    <MatchBannerTeam type="r">
                        <MatchBannerTeamName team={match?.team2} />
                        <MatchBannerTeamDescription
                            type="r"
                            winner={match?.team2.id === match?.winner?.id}
                            score={match?.t2score}
                        />
                    </MatchBannerTeam>
                </MatchBannerTeams>
            </MatchDetailBanner>

            <MatchDetailNavButtons match={match} />

            <MatchDetail>
                <MatchSelector
                    statsPage={statsPage}
                    setPageToPredictions={setPageToPredictions}
                    setPageToStats={setPageToStats}
                />

                {statsPage && <MatchWinProbability match={match} />}
                {statsPage && <MatchHeadtoHead match={match} stats={stats} />}
                {statsPage && <MatchOverallStats match={match} stats={stats} />}
                {statsPage && <RecentMeetings match={match} />}

                {!statsPage && !!state?.user && (
                    <MatchPredictions match={match} />
                )}
                {!statsPage && !state?.user && (
                    <div className="inline-flex w-full items-center justify-center">
                        <MdOutlineErrorOutline className="text-xl text-red-700" />
                        <span className="mx-4">You are not authorized!</span>
                        <Link
                            to="/auth/login"
                            className="text-blue-600 underline"
                        >
                            Login Here
                        </Link>
                    </div>
                )}
            </MatchDetail>
        </div>
    );
};
