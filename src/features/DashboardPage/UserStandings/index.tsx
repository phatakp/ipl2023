import { Pagination } from "components/Pagination";
import { useAuthContext } from "context/AuthContext";
import { UserRow } from "features/DashboardPage/UserStandings/UserRow";
import { useLoader } from "hooks/useLoader";
import { usePlayers } from "hooks/usePlayers";
import { IUser } from "interfaces/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserStandings = () => {
    const { state } = useAuthContext();
    const [page, setPage] = useState(1);
    const { isLoading, isError, error, data: userList } = usePlayers();

    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading, setLoader]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
        return null;
    }

    const paid = userList?.filter((item: IUser) => item.paid);
    const sumPaid = paid?.length > 0 ? paid.length * 500 : 0;

    const total = userList?.length;
    let end = page * 10;
    const start = end - 9;
    if (end > total) end = total;
    const users = userList
        ?.sort((a: IUser, b: IUser) => a?.rank - b?.rank)
        .slice(start - 1, end);

    const prevClicked = () => setPage((prev) => prev - 1);
    const nextClicked = () => setPage((prev) => prev + 1);

    return (
        <div className="bg-darkblue container mx-auto p-4">
            <h1 className="mx-2 mb-4 rounded py-1 text-center text-xl font-bold text-white">
                Player Standings
            </h1>

            <div className="relative overflow-x-auto shadow-md">
                <div
                    className={`mx-2 mt-4 grid  items-center gap-2 px-2 text-left text-sm uppercase text-gray-100 ${
                        state?.user?.is_site_admin
                            ? "grid-cols-7 sm:grid-cols-9"
                            : "grid-cols-6 sm:grid-cols-8"
                    }`}
                >
                    <div className="font-bold">#</div>
                    <div className="col-span-2 text-left">Player</div>
                    <div className="col-span-2">Team</div>
                    <div className="text-right">Value</div>
                    <div className="col-span-2 hidden text-center sm:block">
                        Form
                    </div>
                    {state?.user?.is_site_admin && <div></div>}
                </div>
                {users?.map((user: IUser) => (
                    <UserRow
                        key={user.id}
                        user={user}
                        show={state?.user?.is_site_admin}
                        sumPaid={sumPaid}
                    />
                ))}
            </div>

            <Pagination
                start={start}
                end={end}
                total={total}
                prevClicked={prevClicked}
                nextClicked={nextClicked}
            />
        </div>
    );
};
