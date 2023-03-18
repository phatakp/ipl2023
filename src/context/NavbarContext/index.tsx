import { createContext, ReactNode, useContext, useState } from "react";

interface NavbarContextProps {
    showMenu: boolean;
    showUserDropMenu: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    openUserDropdown: () => void;
    closeUserDropdown: () => void;
}

const NavbarContext = createContext({} as NavbarContextProps);

export const NavbarContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showUserDropMenu, setShowUserDropMenu] = useState(false);

    const openMenu = () => setShowMenu(true);
    const openUserDropdown = () => setShowUserDropMenu(true);
    const closeMenu = () => setShowMenu(false);
    const closeUserDropdown = () => setShowUserDropMenu(false);

    return (
        <NavbarContext.Provider
            value={{
                showMenu,
                showUserDropMenu,
                openMenu,
                closeMenu,
                openUserDropdown,
                closeUserDropdown,
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbarContext = () => useContext(NavbarContext);
