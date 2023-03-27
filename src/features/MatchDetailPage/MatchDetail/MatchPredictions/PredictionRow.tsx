import { IMatch } from "interfaces/matches";
import { IPred } from "interfaces/predictions";
import { Link } from "react-router-dom";

export const PredictionRow = ({
    pred,
    index,
    user,
    match,
    currUserId,
}: {
    pred: IPred;
    index?: number;
    user?: boolean;
    match?: IMatch;
    currUserId?: number;
}) => {
    const time = new Date(pred.create_upd_time).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const date = new Date(pred.create_upd_time).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
    });
    const show =
        user ||
        match?.entry_cutoff_passed ||
        !match?.scheduled ||
        (currUserId && pred?.user?.id === currUserId);

    return (
        <Link
            to={`/matches/${pred?.match?.num}`}
            className="hover:bg-darkblue relative mx-2 mt-1 mb-4 grid grid-cols-10 items-center gap-2 rounded-lg border-2 border-gray-500 bg-white px-2 text-left text-sm font-semibold text-gray-700 hover:text-white sm:grid-cols-8 md:grid-cols-9"
        >
            <div>
                {pred.double && (
                    <span className="absolute flex h-6 w-6 -rotate-12 items-center justify-center rounded-full bg-green-600 text-xs text-white ">
                        D
                    </span>
                )}
                <span className="text-right font-bold capitalize">
                    {index ?? pred?.match?.num}
                </span>
            </div>
            <div className="col-span-3 capitalize sm:col-span-2">
                {user
                    ? pred?.match?.team1.shortname
                        ? `${pred?.match?.team1.shortname}vs${pred?.match?.team2.shortname}`
                        : "IPL Winner"
                    : pred.user.name.split(" ")[0].toLowerCase()}
            </div>
            <div className="col-span-2 flex flex-row items-center justify-center py-1 sm:col-span-1 md:justify-start">
                {show ? (
                    <>
                        <img
                            src={`${
                                process.env.REACT_APP_IMAGE_URL
                            }/teamLogos/${
                                pred?.team?.shortname ?? "default"
                            }.png`}
                            alt="Team Logo"
                            className="h-8 w-8 md:mr-2"
                        />
                        <span className="hidden md:flex">
                            {pred?.team?.shortname}
                        </span>
                    </>
                ) : (
                    <span>###</span>
                )}
            </div>
            <div className="col-span-2 py-1 text-right sm:col-span-1">
                {show ? pred.amount : "##"}
            </div>
            <div
                className={`col-span-2 py-1 text-right sm:col-span-1 ${
                    pred.result < 0 ? "text-red-600" : "text-green-500"
                }`}
            >
                {pred.result.toFixed(0)}
            </div>
            <div className="hidden py-1 text-center uppercase md:flex">
                {pred.status}
            </div>
            <div className="hidden py-1 text-center sm:col-span-2 sm:flex">
                {`${date}, ${time}`}
            </div>
        </Link>
    );
};
