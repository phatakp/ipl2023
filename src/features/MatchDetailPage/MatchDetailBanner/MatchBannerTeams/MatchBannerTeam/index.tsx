interface IMatchBannerTeam {
    type: "l" | "r";
    children: React.ReactNode;
}

export const MatchBannerTeam = ({ type, children }: IMatchBannerTeam) => {
    return (
        <div
            className={`flex flex-col items-center justify-center md:justify-around w-full ${
                type === "l" ? "md:flex-row" : "md:flex-row-reverse"
            }`}
        >
            {children}
        </div>
    );
};
