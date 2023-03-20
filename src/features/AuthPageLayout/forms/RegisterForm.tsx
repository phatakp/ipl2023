import { Form } from "components/Form";
import { FormInput } from "components/FormInput";
import { FormSelect } from "components/FormSelect";
import { useRegister } from "features/AuthPageLayout/hooks/useRegister";
import { useLoader } from "hooks/useLoader";
import { useTeams } from "hooks/useTeams";
import { ITeam } from "interfaces/teams";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        ipl_winner: "",
    });

    const { name, email, password, password2, ipl_winner } = formData;
    const { registerUser, isLoading } = useRegister();
    const { setLoader } = useLoader();

    const {
        isLoading: isTeamsLoading,
        isError,
        error,
        data: teamList,
    } = useTeams();

    useEffect(() => {
        setLoader(isTeamsLoading);
    }, [isLoading, isTeamsLoading, setLoader]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
    }

    const teamOptions = teamList?.map((team: ITeam) => ({
        text: team.longname,
        value: team.shortname,
    }));

    const onFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== password2)
            toast.error("The two password fields don't match");
        else registerUser(formData);
    };

    return (
        <Form
            title="New User Registration"
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
            <FormInput
                type="text"
                name="name"
                label="Name"
                value={name}
                onFieldChange={onFieldChange}
                modal={false}
            />
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
            <FormInput
                type="password"
                name="password2"
                label="Confirm Password"
                value={password2}
                onFieldChange={onFieldChange}
                modal={false}
            />
            <FormSelect
                name="ipl_winner"
                label="IPL Winner"
                value={ipl_winner}
                onFieldChange={onFieldChange}
                options={teamOptions}
                modal={false}
            />
        </Form>
    );
};
