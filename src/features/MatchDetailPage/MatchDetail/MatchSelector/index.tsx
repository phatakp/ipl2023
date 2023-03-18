interface IMatchSelector {
    statsPage: boolean;
    setPageToStats: () => void;
    setPageToPredictions: () => void;
}

export const MatchSelector = ({
    statsPage,
    setPageToStats,
    setPageToPredictions,
}: IMatchSelector) => {
    return (
        <div className="flex flex-row items-center justify-center mb-8">
            <button
                className={`p-2 font-semibold uppercase w-32  shadow-lg shadow-gray-400 ${
                    statsPage ? "btn-blue" : "border-b border-gray-400"
                } `}
                onClick={setPageToStats}
            >
                Stats
            </button>
            <button
                className={`p-2 font-semibold uppercase w-32  shadow-lg shadow-gray-400 ${
                    !statsPage ? "btn-blue" : "border-b border-gray-400"
                } `}
                onClick={setPageToPredictions}
            >
                Predictions
            </button>
        </div>
    );
};
