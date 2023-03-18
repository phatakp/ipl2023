import { AnimatedComponent } from "components/AnimatedComponent";
import { useAuthContext } from "context/AuthContext";
import { AuthPageType } from "interfaces/auth";
import { Link, useLocation } from "react-router-dom";

export const AuthPanel = () => {
    const { state } = useAuthContext();
    const location = useLocation();
    const authPage = location.pathname.split("/").pop() as AuthPageType;

    return (
        <div className="z-10 p-4 md:p-8">
            <div className="grid grid-cols-1 items-center text-center">
                <h3 className="col-span-2 text-3xl font-bold  text-white md:col-span-1">
                    {authPage === AuthPageType.LOGIN
                        ? "Create an Account"
                        : authPage === AuthPageType.REGISTER
                        ? "Already have an account"
                        : authPage === AuthPageType.CHANGEWINNER
                        ? "Change IPL Winner"
                        : authPage === AuthPageType.CHANGEPASSWORD
                        ? "Change Password"
                        : "Reset Password"}
                </h3>
                <div className="transition delay-100 duration-300 ease-out ">
                    <p className="mb-4 text-white">
                        {authPage === AuthPageType.LOGIN ? (
                            "Enter few details and create a new account"
                        ) : authPage === AuthPageType.REGISTER ? (
                            "Enter Credentials for your Fantasy Account"
                        ) : authPage === AuthPageType.CHANGEWINNER ? (
                            <>
                                <span className="mr-2 text-sm">
                                    Current Selection:
                                </span>
                                <strong className="text-yellow-200">
                                    {state?.user?.winner.longname}
                                </strong>
                            </>
                        ) : authPage === AuthPageType.CHANGEPASSWORD ? (
                            "Choose a strong password"
                        ) : (
                            "Enter email to reset"
                        )}
                    </p>
                    {[AuthPageType.LOGIN, AuthPageType.REGISTER].includes(
                        authPage
                    ) && (
                        <Link
                            to={
                                authPage === AuthPageType.LOGIN
                                    ? "/auth/register"
                                    : "/auth/login"
                            }
                            className="btn-orange mt-4 rounded-full px-8 py-2 text-center"
                        >
                            {authPage === AuthPageType.LOGIN
                                ? "Register"
                                : "Login"}
                        </Link>
                    )}
                </div>
                <AnimatedComponent type="slide">
                    <img
                        className="hidden max-w-xl md:block"
                        src={`${process.env.REACT_APP_IMAGE_URL}/${
                            authPage === AuthPageType.LOGIN
                                ? "login"
                                : "register"
                        }.svg`}
                        alt="Page Svg"
                    />
                </AnimatedComponent>
            </div>
        </div>
    );
};
