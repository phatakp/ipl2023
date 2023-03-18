import { useNavbarContext } from "context/NavbarContext";
import { FaBars, FaTimes } from "react-icons/fa";

export const Toggle = () => {
    const { showMenu, openMenu, closeMenu } = useNavbarContext();

    return (
        <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm md:hidden"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
        >
            <span className="sr-only">Open main menu</span>
            {showMenu && (
                <FaTimes
                    className="text-xl text-white hover:text-pink-600"
                    onClick={closeMenu}
                />
            )}
            {!showMenu && (
                <FaBars
                    className="text-xl text-white hover:text-pink-600"
                    onClick={openMenu}
                />
            )}
        </button>
    );
};
