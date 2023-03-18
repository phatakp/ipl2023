import { IUser } from "interfaces/auth";

export const UserRow = ({ user }: { user: IUser }) => {
    return (
        <div
            className={`mx-2 mb-4 mt-1 grid grid-cols-6 items-center gap-2 rounded-lg border-2 border-gray-500 bg-white px-2 text-left text-sm font-semibold text-gray-700 sm:grid-cols-8 `}
        >
            <div className="font-bold">{user.rank}</div>
            <div className="col-span-2 text-left capitalize">
                {user.name.split(" ")[0]}
            </div>
            <div className="col-span-2 flex flex-row items-center justify-start py-1 text-gray-900">
                <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${user.winner.shortname}.png`}
                    alt="Team Logo"
                    className="mr-1 h-8 w-8"
                />
                <span>{user.winner.shortname}</span>
            </div>
            <div
                className={`py-1 text-right ${
                    user.amount < 0 ? "text-red-600" : "text-green-500"
                }`}
            >
                {user.amount.toFixed(0)}
            </div>
            <div className="col-span-2 hidden items-center justify-center gap-1 py-1 sm:inline-flex">
                {user.form.map((item, index) => (
                    <span
                        key={index}
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            item === "won"
                                ? "bg-green-500"
                                : item === "lost"
                                ? "bg-red-600"
                                : "bg-gray-500"
                        } text-xs text-white`}
                    >
                        {item === "won" ? "W" : item === "lost" ? "L" : "-"}
                    </span>
                ))}
            </div>
        </div>
    );
};
