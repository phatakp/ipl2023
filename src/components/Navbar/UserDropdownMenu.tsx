import { useAuthContext } from "context/AuthContext";
import { useNavbarContext } from "context/NavbarContext";
import { useLogout } from "features/AuthPageLayout/hooks/useLogout";
import { useLoader } from "hooks/useLoader";
import { useMatches } from "hooks/useMatches";
import { IMatch } from "interfaces/matches";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { UserDropdownLink } from "./UserDropdownLink";

export const UserDropdownMenu = () => {
    const { showUserDropMenu } = useNavbarContext();
    const { state } = useAuthContext();
    const { logoutUser } = useLogout();
    const { isLoading, isError, error, data: matches } = useMatches();
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

    const lastMatch: IMatch | undefined = matches
        ?.filter((item: IMatch) => !item.scheduled)
        .sort((a: IMatch, b: IMatch) => b.num - a.num)?.[0];

    return (
        <div
            className={`fixed top-10 right-0 z-50 my-4 list-none divide-y divide-gray-400 rounded-lg bg-gray-200 text-base shadow shadow-gray-400 ${
                showUserDropMenu ? "" : "hidden"
            }`}
        >
            {state?.user && (
                <>
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900">
                            {state.user.name}
                        </span>
                        <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                            {state.user.email}
                        </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        {lastMatch && lastMatch?.num >= 35 ? null : (
                            <UserDropdownLink
                                path="/auth/change-winner"
                                title="Change IPL Winner"
                            />
                        )}
                        <UserDropdownLink
                            path="/auth/change-password"
                            title="Change Password"
                        />
                        <UserDropdownLink
                            path="/auth/logout"
                            title="Sign Out"
                            callback={logoutUser}
                        />
                    </ul>
                </>
            )}
        </div>
    );
};
