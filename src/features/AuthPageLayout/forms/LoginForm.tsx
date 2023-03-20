import { Form } from "components/Form";
import { FormInput } from "components/FormInput";
import { useLogin } from "features/AuthPageLayout/hooks/useLogin";
import { ILoginData } from "interfaces/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
    const [formData, setFormData] = useState<ILoginData>({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const { loginUser, isLoading } = useLogin();

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        });

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser(formData);
    };

    return (
        <Form title="Login" isLoading={isLoading} onFormSubmit={onFormSubmit}>
            <FormInput
                type="email"
                name="email"
                label="Email"
                value={email}
                onFieldChange={onFieldChange}
                modal={false}
            />
            <FormInput
                type="password"
                name="password"
                label="Password"
                value={password}
                onFieldChange={onFieldChange}
                modal={false}
            />
            <div className="flex w-full justify-end">
                <Link
                    to="/auth/validate-user"
                    className="text-right text-black underline md:text-blue-600"
                >
                    Forgot Password
                </Link>
            </div>
        </Form>
    );
};
