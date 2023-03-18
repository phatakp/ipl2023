import { ILoginResponse, IUser } from "interfaces/auth";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { useCookies } from "react-cookie";

interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    token: ILoginResponse | null;
}

enum AuthActionType {
    SET_AUTHENTICATED = "SET_AUTHENTICATED",
    SET_NOT_AUTHENTICATED = "SET_NOT_AUTHENTICATED",
    SET_USER = "SET_USER",
}

export type AuthAction =
    | { type: AuthActionType.SET_AUTHENTICATED; payload: ILoginResponse }
    | { type: AuthActionType.SET_NOT_AUTHENTICATED }
    | { type: AuthActionType.SET_USER; payload: IUser };

interface AuthContextProps {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}
const AuthContext = createContext({} as AuthContextProps);

const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const AuthReducer = (state = initialAuthState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionType.SET_AUTHENTICATED:
            return { ...state, token: action.payload, isAuthenticated: true };
        case AuthActionType.SET_USER:
            return { ...state, user: action.payload };
        case AuthActionType.SET_NOT_AUTHENTICATED:
            return { ...initialAuthState };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch]: [
        state: AuthState,
        dispatch: React.Dispatch<AuthAction>
    ] = useReducer(AuthReducer, initialAuthState);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAppState should be used within Context Provider");

    const { state, dispatch } = context;
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const setUserData = (data: IUser) =>
        dispatch({ type: AuthActionType.SET_USER, payload: data });

    const setTokenData = (data: ILoginResponse) => {
        setCookie("token", data.access, {
            path: "/",
            maxAge: 10 * 60,
            secure: `${process.env.REACT_APP_COOKIE_SECURE}` === "True",
        });
        dispatch({ type: AuthActionType.SET_AUTHENTICATED, payload: data });
    };

    const setNotAuthenticated = () => {
        removeCookie("token");
        dispatch({ type: AuthActionType.SET_NOT_AUTHENTICATED });
    };

    return { state, setTokenData, setNotAuthenticated, setUserData };
};
