import { useNavbarContext } from "context/NavbarContext";
import { Link, Path, useLocation } from "react-router-dom";

type NavItemProps = {
    path: string | Partial<Path>;
    title: string;
};

export const NavItem = ({ path, title }: NavItemProps) => {
    const location = useLocation();
    const absPath = path.toString().slice(1);
    const linkPath = location.pathname.slice(1);
    const active =
        (absPath && linkPath.startsWith(absPath)) || location.pathname === path;
    const { closeMenu } = useNavbarContext();

    return (
        <li>
            <Link
                to={path}
                className={`block w-full rounded px-4 py-2 uppercase text-white transition duration-300 ease-in md:w-auto ${
                    active
                        ? "btn-pink"
                        : "hover:rounded-none hover:border-b-4 hover:border-pink-600"
                }`}
                onClick={closeMenu}
            >
                {title}
            </Link>
        </li>
    );
};
