import { useAuthContext } from "context/AuthContext";
import { useAuthUser } from "hooks/useAuthUser";
import { useLoader } from "hooks/useLoader";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const RequireAuth = () => {
    const { state } = useAuthContext();
    const { setLoader } = useLoader();
    const location = useLocation();

    const { isLoading, isError, error } = useAuthUser();

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
        return <Navigate to="/auth/login" state={{ from: location }} />;
    }

    if (!isLoading && !state?.user) {
        return <Navigate to="/auth/login" state={{ from: location }} />;
    }

    return <Outlet />;
};
