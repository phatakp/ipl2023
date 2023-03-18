export const MatchCarouselDate = ({ matchDate }: { matchDate: Date }) => {
    return (
        <div className="ml-0 flex w-16 flex-col items-center justify-center bg-gray-700 py-3 text-gray-300">
            <span className="text-center text-sm">
                {new Intl.DateTimeFormat("en", {
                    month: "short",
                }).format(matchDate)}
            </span>
            <span className="text-center text-3xl font-semibold">
                {new Intl.DateTimeFormat("en", {
                    day: "2-digit",
                }).format(matchDate)}
            </span>
        </div>
    );
};
