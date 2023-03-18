interface IMatchBannerTeamOversGrid {
    type: "l" | "r";
    winner: boolean;
    ovs: number;
}

export const MatchBannerTeamOversGrid = ({
    type,
    winner,
    ovs,
}: IMatchBannerTeamOversGrid) => {
    return (
        <div
            className={`flex flex-row flex-nowrap items-center justify-center ${
                type === "l" ? "md:justify-end" : "justify-start"
            }`}
        >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <span
                    key={item}
                    className={`h-6 w-1 ${
                        winner && item + 1 <= ovs ? "bg-white" : "bg-gray-500"
                    } mr-1.5`}
                ></span>
            ))}
        </div>
    );
};
