import { useNavbarContext } from "context/NavbarContext";

export const UserDropdown = () => {
    const { showUserDropMenu, openUserDropdown, closeUserDropdown } =
        useNavbarContext();
    return (
        <button
            className="relative mr-3 flex rounded-full bg-pink-600 text-sm after:absolute after:-right-3 after:top-3 after:text-white after:content-['▼'] focus:ring-4 focus:ring-gray-300 md:mr-0"
            onClick={showUserDropMenu ? closeUserDropdown : openUserDropdown}
        >
            <span className="sr-only">Open user menu</span>
            <img
                className="h-10 w-10 rounded-full"
                src={`${process.env.REACT_APP_IMAGE_URL}/profile.png`}
                alt=""
            />
        </button>
    );
};
