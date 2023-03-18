export const MatchCarouselTeam = ({
    name,
    team,
}: {
    name: string;
    team: "l" | "r";
}) => {
    return (
        <div
            className={`bg-${name} px-3 py-1 text-center font-extrabold text-white ${
                team === "l" ? "rounded-l-full" : "rounded-r-full"
            }`}
        >
            {name}
        </div>
    );
};
