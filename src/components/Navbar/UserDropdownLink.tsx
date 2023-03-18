import { useNavbarContext } from "context/NavbarContext";
import { Link, Path } from "react-router-dom";

type UserDropdownLinkProps = {
    path: string | Partial<Path>;
    title: string;
    callback?: () => void;
};

export const UserDropdownLink = ({
    path,
    title,
    callback,
}: UserDropdownLinkProps) => {
    const { closeUserDropdown } = useNavbarContext();

    const onNavClick = () => {
        if (!!callback) callback();
        closeUserDropdown();
    };

    return (
        <li>
            <Link
                to={path}
                className="z-50 block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-500 hover:text-gray-200"
                onClick={onNavClick}
            >
                {title}
            </Link>
        </li>
    );
};
