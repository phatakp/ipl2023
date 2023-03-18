import { Form } from "components/Form";
import { FormSelect } from "components/FormSelect";
import { useChangeWinner } from "features/AuthPageLayout/hooks/useChangeWinner";
import { useLoader } from "hooks/useLoader";
import { useTeams } from "hooks/useTeams";
import { ITeam } from "interfaces/teams";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ChangeWinner = () => {
    const { setLoader } = useLoader();
    const [formData, setFormData] = useState({
        ipl_winner: "",
    });

    const { ipl_winner } = formData;
    const { changeWinnerUser, isLoading } = useChangeWinner();

    const {
        isLoading: isTeamsLoading,
        isError,
        error,
        data: teamList,
    } = useTeams();

    useEffect(() => {
        setLoader(isTeamsLoading);
    }, [isLoading]);

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

    const onFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        changeWinnerUser(formData);
    };

    return (
        <Form
            title="Change IPL Winner"
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
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
