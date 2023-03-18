import { IMatch } from "interfaces/matches";
import { Link } from "react-router-dom";

export const MatchListDetail = ({ match }: { match: IMatch }) => {
    return (
        <div className="flex flex-row items-center justify-between gap-2 border-b-2 border-gray-200 pb-2 md:flex-col md:border-b-0 md:border-r-2 md:py-2 md:pb-0 md:pr-2 md:text-center">
            <span className="font-semibold text-blue-800">{match.venue}</span>
            <Link
                to={`/matches/${match.num}`}
                className="rounded bg-orange-600 p-2 text-center text-sm font-bold uppercase text-white"
            >
                Match Center
            </Link>
        </div>
    );
};
