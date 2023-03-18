import { useAuthContext } from "context/AuthContext";
import { useNavbarContext } from "context/NavbarContext";
import { NavItem } from "./NavItem";

export const NavItems = () => {
    const { showMenu } = useNavbarContext();
    const { state } = useAuthContext();

    return (
        <div
            className={`mt-4 w-full items-center justify-between md:order-1 md:mt-0 md:flex md:w-auto ${
                showMenu ? "" : "hidden"
            }`}
            id="mobile-menu-2"
        >
            <ul className="flex flex-col space-y-4 rounded-lg  border border-gray-100 p-2 md:mt-0 md:flex-row md:space-y-0 md:space-x-8 md:border-0 md:text-sm md:font-medium">
                <NavItem path="/" title="Home" />
                {state?.user && <NavItem path="/dashboard" title="Dashboard" />}
                <NavItem path="/matches" title="Matches" />
                <NavItem path="/rules" title="Rules" />
            </ul>
        </div>
    );
};
