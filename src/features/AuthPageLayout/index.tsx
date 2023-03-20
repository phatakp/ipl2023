import { useNavbarContext } from "context/NavbarContext";
import { AuthPageType } from "interfaces/auth";
import { Outlet, useLocation } from "react-router-dom";
import { AuthPanel } from "./AuthPanel";

export const AuthPageLayout = () => {
    const location = useLocation();
    const authPage = location.pathname.split("/").pop() as AuthPageType;
    const { showMenu, showUserDropMenu } = useNavbarContext();
    return (
        <div
            className={`container relative mx-auto grid items-start  gap-4 overflow-hidden transition duration-300 ease-in-out before:absolute before:left-[10%] before:right-1/2 before:z-0 before:h-[1000px] before:w-[1300px] before:-translate-x-1/2 before:rounded-full before:bg-blue-600 md:grid-cols-2 md:before:left-0 md:before:top-[10%] md:before:h-[1300px] md:before:w-[1500px] md:before:-translate-y-1/2 ${
                showMenu || showUserDropMenu ? "mt-64" : "mt-24"
            } ${
                authPage === AuthPageType.LOGIN
                    ? "before:bottom-[18%]"
                    : "before:bottom-[18%]"
            }`}
        >
            <AuthPanel />
            <Outlet />
        </div>
    );
};
