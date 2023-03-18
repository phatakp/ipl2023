import { Form } from "components/Form";
import { FormInput } from "components/FormInput";
import { useValidate } from "features/AuthPageLayout/hooks/useValidate";
import { useState } from "react";

export const ValidateUser = () => {
    const [email, setEmail] = useState("");

    const { validateUserEmail, isLoading } = useValidate();

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.currentTarget.value);

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateUserEmail(email);
    };

    return (
        <Form
            title="Reset Password"
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
            <FormInput
                type="email"
                name="email"
                label="Email"
                value={email}
                onFieldChange={onFieldChange}
                modal={false}
            />
        </Form>
    );
};
