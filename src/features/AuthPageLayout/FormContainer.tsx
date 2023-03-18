import { AnimatedComponent } from "components/AnimatedComponent";
import { ValidateUser } from "features/AuthPageLayout/forms/ValidateUser";
import { AuthPageType } from "interfaces/auth";
import { useLocation } from "react-router-dom";
import { ChangePassword } from "./forms/ChangePassword";
import { ChangeWinner } from "./forms/ChangeWinner";
import { LoginForm } from "./forms/LoginForm";
import { RegisterForm } from "./forms/RegisterForm";
import { ResetPassword } from "./forms/ResetPassword";

export const FormContainer = () => {
    const location = useLocation();
    const authPage = location.pathname.split("/").pop() as AuthPageType;

    return (
        <AnimatedComponent>
            <div className="z-20 mx-auto w-full bg-white p-4 text-center">
                {authPage === AuthPageType.LOGIN ? (
                    <LoginForm />
                ) : authPage === AuthPageType.REGISTER ? (
                    <RegisterForm />
                ) : authPage === AuthPageType.CHANGEPASSWORD ? (
                    <ChangePassword />
                ) : authPage === AuthPageType.CHANGEWINNER ? (
                    <ChangeWinner />
                ) : authPage === AuthPageType.RESETPASSWORD ? (
                    <ResetPassword />
                ) : (
                    <ValidateUser />
                )}
            </div>
        </AnimatedComponent>
    );
};
