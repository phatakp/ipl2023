import { AuthContextProvider } from "context/AuthContext";
import { MatchContextProvider } from "context/MatchContext";
import { ModalContextProvider } from "context/ModalContext";
import React from "react";
import { NavbarContextProvider } from "./NavbarContext";

export const AppContext = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <ModalContextProvider>
                <NavbarContextProvider>
                    <MatchContextProvider>{children}</MatchContextProvider>
                </NavbarContextProvider>
            </ModalContextProvider>
        </AuthContextProvider>
    );
};
