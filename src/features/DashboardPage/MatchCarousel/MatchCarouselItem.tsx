import { IMatch } from "interfaces/matches";
import { Link } from "react-router-dom";
import { MatchCarouselDate } from "./MatchCarouselDate";
import { MatchCarouselScore } from "./MatchCarouselScore";
import { MatchCarouselTeam } from "./MatchCarouselTeam";

export const MatchCarouselItem = ({ match }: { match: IMatch }) => {
    const matchDate = new Date(match.date);
    return (
        <Link
            to={`/matches/${match.num}`}
            className="hover:bg-darkblue relative inline-flex h-full cursor-pointer border-l border-gray-400 bg-transparent shadow shadow-gray-400"
        >
            <div className="mx-1 grid grid-cols-5 gap-2">
                <MatchCarouselDate matchDate={matchDate} />

                <div className="col-span-4 flex flex-col items-center justify-center">
                    <div className="mb-2 text-xs text-gray-100">
                        {match.result}
                    </div>

                    <div className="grid grid-cols-5 rounded-full border border-blue-900 ">
                        <MatchCarouselTeam
                            name={match.team1.shortname}
                            team="l"
                        />

                        <div className="col-span-3 flex flex-row items-center justify-between bg-white ">
                            <MatchCarouselScore
                                score={match.t1score}
                                team="l"
                            />

                            <span className="text-sm text-gray-600">v</span>

                            <MatchCarouselScore
                                score={match.t2score}
                                team="r"
                            />
                        </div>

                        <MatchCarouselTeam
                            name={match.team2.shortname}
                            team="r"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};
