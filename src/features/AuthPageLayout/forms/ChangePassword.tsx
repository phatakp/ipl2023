import { Form } from "components/Form";
import { FormInput } from "components/FormInput";
import { useChangePwd } from "features/AuthPageLayout/hooks/useChangePwd";
import { IChangePwdData } from "interfaces/auth";
import { useState } from "react";
import { toast } from "react-toastify";

export const ChangePassword = () => {
    const [formData, setFormData] = useState<IChangePwdData>({
        old_password: "",
        password: "",
        password2: "",
    });

    const { old_password, password, password2 } = formData;

    const { changePwdUser, isLoading } = useChangePwd();

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        });

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== password2)
            toast.error("The two password fields don't match");
        else changePwdUser(formData);
    };

    return (
        <Form
            title="Change Password"
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
            <FormInput
                type="password"
                name="old_password"
                label="Old Password"
                value={old_password}
                onFieldChange={onFieldChange}
                modal={false}
            />
            <FormInput
                type="password"
                name="password"
                label="New Password"
                value={password}
                onFieldChange={onFieldChange}
                modal={false}
            />
            <FormInput
                type="password"
                name="password2"
                label="Confirm New Password"
                value={password2}
                onFieldChange={onFieldChange}
                modal={false}
            />
        </Form>
    );
};
