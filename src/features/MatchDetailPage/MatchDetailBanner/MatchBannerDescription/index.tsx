interface IMatchDescription {
    type: string;
    num: number;
    venue: string;
    dt: string;
}

export const MatchBannerDescription = ({
    type,
    num,
    venue,
    dt,
}: IMatchDescription) => {
    const date = new Date(dt).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return (
        <div className="mx-auto w-[80%] border-b border-gray-400 pb-2 text-xs font-semibold capitalize tracking-wide md:w-[60%] md:border-b-2 md:text-sm">
            <span>{type === "league" ? `Match ${num}` : type}</span> |{" "}
            <span>{venue}</span> | <span>{date}</span>
        </div>
    );
};
