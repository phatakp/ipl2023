import { useAmountPaid } from "hooks/useAmoutPaid";
import { IUser } from "interfaces/auth";
import { ChangeEvent } from "react";

export const UserRow = ({
    user,
    show,
    sumPaid,
}: {
    user: IUser;
    show?: boolean;
    sumPaid: number;
}) => {
    const { userPaid } = useAmountPaid();

    const onPaidClicked = (e: ChangeEvent<HTMLInputElement>) => {
        userPaid({ email: user?.email, paid: e.target.checked });
    };

    return (
        <div
            className={`mx-2 mb-4 mt-1 grid items-center gap-2 rounded-lg border-2 border-gray-500 bg-white px-2 text-left text-sm font-semibold text-gray-700 ${
                show
                    ? "grid-cols-7 sm:grid-cols-9"
                    : "grid-cols-6 sm:grid-cols-8"
            }`}
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
                className={`inline-flex items-center justify-end py-1 text-right ${
                    user.amount < 0 ? "text-red-600" : "text-green-500"
                }`}
            >
                {user.amount.toFixed(0)}
                {(user?.paid || user?.is_site_admin) && (
                    <span className="text-[0.6rem] text-gray-500">
                        {user?.is_site_admin ? `-${sumPaid}` : "+500"}
                    </span>
                )}
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
            {show && !user?.is_site_admin && (
                <div className="py-1">
                    <input
                        id="paid"
                        name="paid"
                        checked={user?.paid}
                        type="checkbox"
                        value=""
                        onChange={onPaidClicked}
                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 ring-offset-gray-800 focus:ring-2 focus:ring-blue-600"
                    />
                </div>
            )}
        </div>
    );
};
