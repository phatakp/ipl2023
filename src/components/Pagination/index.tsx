import { NavButton } from "components/NavButton";

interface IPagination {
    start: number;
    end: number;
    total: number;
    prevClicked: () => void;
    nextClicked: () => void;
}

export const Pagination = ({
    start,
    end,
    total,
    prevClicked,
    nextClicked,
}: IPagination) => {
    return (
        <div className="flex flex-col items-center">
            {/* <!-- Help text --> */}
            <span className="text-sm text-gray-400">
                Showing{" "}
                <span className="font-semibold text-white">{start}</span> to{" "}
                <span className="font-semibold text-white">{end}</span> of{" "}
                <span className="font-semibold text-white">{total}</span>{" "}
                Entries
            </span>
            <div className="xs:mt-0 mt-2 inline-flex">
                {/* <!-- Buttons --> */}
                <NavButton
                    type="prev"
                    onClicked={prevClicked}
                    disabled={start === 1}
                />
                <NavButton
                    type="next"
                    onClicked={nextClicked}
                    disabled={end === total}
                />
            </div>
        </div>
    );
};
