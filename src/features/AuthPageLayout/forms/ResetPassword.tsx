import { Form } from "components/Form";
import { FormInput } from "components/FormInput";
import { useReset } from "features/AuthPageLayout/hooks/useReset";
import { IResetPwdData } from "interfaces/auth";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const ResetPassword = () => {
    const location = useLocation();
    const [formData, setFormData] = useState<IResetPwdData>({
        id: location.state.id,
        password: "",
        password2: "",
    });

    const { password, password2 } = formData;

    const { resetUser, isLoading } = useReset();

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        });

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resetUser(formData);
    };

    return (
        <Form
            title="Reset Password"
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
            <FormInput
                type="password"
                name="password"
                label="Password"
                value={password}
                onFieldChange={onFieldChange}
                modal={false}
            />
            <FormInput
                type="password"
                name="password2"
                label="Confirm Password"
                value={password2}
                onFieldChange={onFieldChange}
                modal={false}
            />
        </Form>
    );
};
