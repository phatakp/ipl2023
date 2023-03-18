import { IMatch } from "interfaces/matches";
import { createContext, ReactNode, useContext, useState } from "react";

interface MatchContextProps {
    item: IMatch | undefined;
    setItem: React.Dispatch<React.SetStateAction<IMatch | undefined>>;
}

const MatchContext = createContext({} as MatchContextProps);

export const MatchContextProvider = ({ children }: { children: ReactNode }) => {
    const [item, setItem] = useState<IMatch | undefined>(undefined);

    return (
        <MatchContext.Provider value={{ item, setItem }}>
            {children}
        </MatchContext.Provider>
    );
};

export const useMatchContext = () => useContext(MatchContext);
