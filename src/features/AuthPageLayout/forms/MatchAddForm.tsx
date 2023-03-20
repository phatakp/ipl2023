import { Form } from "components/Form";
import { FormInput } from "components/FormInput";
import { FormSelect } from "components/FormSelect";
import { useMatchAdd } from "features/AuthPageLayout/hooks/useMatchAdd";
import { useLoader } from "hooks/useLoader";
import { useTeams } from "hooks/useTeams";
import { ITeam } from "interfaces/teams";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const MatchAddForm = () => {
    const {
        isLoading: isTeamsLoading,
        isError,
        error,
        data: teamList,
    } = useTeams();

    const { addNewMatch, isLoading } = useMatchAdd();

    const [formData, setFormData] = useState({
        num: 0,
        date: "",
        t1: "",
        t2: "",
        type: "",
        venue: "",
        min_bet: 0,
    });

    const { num, date, t1, t2, type, venue, min_bet } = formData;

    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isTeamsLoading);
    }, [isTeamsLoading, setLoader]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
    }

    const typeOptions = [
        { text: "Qualifier 1", value: "qualifier 1" },
        { text: "Eliminator", value: "eliminator" },
        { text: "Qualifier 2", value: "qualifier 2" },
        { text: "Final", value: "final" },
    ];

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
        addNewMatch(formData);
    };

    return (
        <Form
            title="Add Match"
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
            <div className="grid grid-cols-2 gap-2">
                <FormInput
                    type="number"
                    name="num"
                    label="Match Num"
                    value={num}
                    onFieldChange={onFieldChange}
                />
                <FormSelect
                    name="type"
                    label="Type"
                    value={type}
                    onFieldChange={onFieldChange}
                    options={typeOptions}
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <FormSelect
                    name="t1"
                    label="Team 1"
                    value={t1}
                    onFieldChange={onFieldChange}
                    options={teamOptions}
                />
                <FormSelect
                    name="t2"
                    label="Team 2"
                    value={t2}
                    onFieldChange={onFieldChange}
                    options={teamOptions}
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <FormInput
                    type="datetime-local"
                    name="date"
                    label="Date"
                    value={date}
                    onFieldChange={onFieldChange}
                />
                <FormInput
                    type="number"
                    name="min_bet"
                    label="Min Bet"
                    value={min_bet}
                    onFieldChange={onFieldChange}
                />
            </div>

            <FormInput
                type="text"
                name="venue"
                label="Venue"
                value={venue}
                onFieldChange={onFieldChange}
            />
        </Form>
    );
};
