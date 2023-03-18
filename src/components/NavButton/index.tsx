interface IPrevButton {
    onClicked: () => void;
    disabled: boolean;
    type: "prev" | "next";
}

export const NavButton = ({ onClicked, disabled, type }: IPrevButton) => {
    const svg = (
        <svg
            aria-hidden="true"
            className={`h-5 w-5 ${type === "prev" ? "mr-2" : "ml-2"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d={`${
                    type === "prev"
                        ? "M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        : "M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                }`}
                clipRule="evenodd"
            ></path>
        </svg>
    );

    return (
        <button
            className={`flex cursor-pointer flex-row items-center rounded bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-default disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:bg-gray-600 ${
                type === "prev" ? "flex-row" : "flex-row-reverse"
            }`}
            onClick={onClicked}
            disabled={disabled}
        >
            {svg}
            <span className="capitalize">{type}</span>
        </button>
    );
};
