export const MatchBannerTeams = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-row justify-between items-center gap-2 py-4 lg:mx-10">
            {children}
        </div>
    );
};
