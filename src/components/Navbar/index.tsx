import { useAuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { NavItems } from "./NavItems";
import { Toggle } from "./Toggle";
import { UserDropdown } from "./UserDropdown";
import { UserDropdownMenu } from "./UserDropdownMenu";

export const Navbar = () => {
    const { state } = useAuthContext();
    return (
        <nav className="bg-darkblue fixed top-0 left-0 right-0 z-10 overflow-visible border-b border-gray-200 px-2 py-2.5 sm:px-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Logo />
                <div className="relative flex items-center md:order-2 ">
                    {!state?.user && (
                        <Link
                            to="/auth/login"
                            className="btn-pink rounded-full px-8 py-1"
                        >
                            Login
                        </Link>
                    )}
                    {state.user && <UserDropdown />}
                    {state.user && <UserDropdownMenu />}
                    <Toggle />
                </div>
                <NavItems />
            </div>
        </nav>
    );
};
