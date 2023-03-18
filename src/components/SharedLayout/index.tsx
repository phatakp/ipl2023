import { Loader } from "components/Loader";
import { Navbar } from "components/Navbar";
import { useLoader } from "hooks/useLoader";
import { Outlet } from "react-router-dom";
import { ToastContainer, TypeOptions } from "react-toastify";

const contextClass: Partial<Record<TypeOptions, string>> = {
    success: "text-green-600 border-green-600",
    error: "text-red-800 border-red-800",
    info: "text-gray-600 border-gray-600",
    default: "text-indigo-600 border-indigo-600",
};

export const SharedLayout = () => {
    const { loading } = useLoader();
    return (
        <div className="relative">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <ToastContainer
                        toastClassName={(cls) =>
                            contextClass[cls?.type || "default"] +
                            " bg-white relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer capitalize border-2"
                        }
                        bodyClassName={() => "text-sm font-med block p-3"}
                        position="top-right"
                        autoClose={3000}
                    />
                    <Outlet />
                </>
            )}
        </div>
    );
};
