import { Form } from "components/Form";
import { FormInput } from "components/FormInput";
import { FormSelect } from "components/FormSelect";
import { useMatchUpdate } from "features/AuthPageLayout/hooks/useMatchUpdate";
import { useLoader } from "hooks/useLoader";
import { useMatch } from "hooks/useMatch";
import { IMatchChangeData } from "interfaces/matches";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const MatchUpdateForm = () => {
    const { matchNum } = useParams();

    const {
        isLoading: isMatchLoading,
        isError: isMatchError,
        error: matchError,
        data: match,
    } = useMatch(Number(matchNum));

    const [formData, setFormData] = useState({
        matchNum: Number(matchNum),
        bfirst: match?.bat_first?.shortname ?? "",
        wTeam: match?.winner?.shortname ?? "",
        t1runs: `${match?.t1score?.runs ?? 0}/${match?.t1score?.wickets ?? 0}`,
        t1overs: `${match?.t1score?.overs ?? 0.0}`,
        t2runs: `${match?.t2score?.runs ?? 0}/${match?.t2score?.wickets ?? 0}`,
        t2overs: `${match?.t2score?.overs ?? 0.0}`,
        status: match?.status ?? "",
    });

    const { bfirst, wTeam, t1runs, t2runs, t1overs, t2overs, status } =
        formData;
    const { updateMatch, isLoading } = useMatchUpdate();
    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isMatchLoading || isLoading);
        setFormData({
            ...formData,
            matchNum: Number(matchNum),
            bfirst: match?.bat_first?.shortname ?? "",
            wTeam: match?.winner?.shortname ?? "",
            t1runs: `${match?.t1score?.runs ?? 0}/${
                match?.t1score?.wickets ?? 0
            }`,
            t1overs: `${match?.t1score?.overs ?? 0.0}`,
            t2runs: `${match?.t2score?.runs ?? 0}/${
                match?.t2score?.wickets ?? 0
            }`,
            t2overs: `${match?.t2score?.overs ?? 0.0}`,
            status: match?.status ?? "",
        });
    }, [isMatchLoading]);

    if (isMatchError) {
        const message =
            (matchError as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
    }

    const statusOptions = [
        { text: "Scheduled", value: "scheduled" },
        { text: "Completed", value: "completed" },
        { text: "Abandoned", value: "abandoned" },
    ];

    const teamOptions = [
        { text: match?.team1?.longname, value: match?.team1?.shortname },
        { text: match?.team2?.longname, value: match?.team2?.shortname },
    ];

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
        const { t1runs, t1overs, t2runs, t2overs, ...data } = formData;
        const [t1r, t1w] = t1runs?.split("/");
        const [t2r, t2w] = t2runs?.split("/");
        const t1score =
            t1r && t1w
                ? {
                      runs: Number(t1r),
                      wickets: Number(t1w),
                      overs: Number(t1overs) ?? 0,
                  }
                : {
                      runs: 0,
                      wickets: 0,
                      overs: Number(t1overs) ?? 0,
                  };
        const t2score =
            t2r && t2w
                ? {
                      runs: Number(t2r),
                      wickets: Number(t2w),
                      overs: Number(t2overs) ?? 0,
                  }
                : {
                      runs: 0,
                      wickets: 0,
                      overs: Number(t2overs) ?? 0,
                  };
        const matchData: IMatchChangeData = { ...data, t1score, t2score };
        updateMatch(matchData);
    };

    return (
        <Form
            title="Match Update"
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
        >
            <FormSelect
                name="status"
                label="Status"
                value={status}
                onFieldChange={onFieldChange}
                options={statusOptions}
            />

            <FormSelect
                name="bfirst"
                label="Bat First Team"
                value={bfirst}
                onFieldChange={onFieldChange}
                options={teamOptions}
                required={status === "completed"}
            />

            <FormSelect
                name="wTeam"
                label="Winner"
                value={wTeam}
                onFieldChange={onFieldChange}
                options={teamOptions}
                required={status === "completed"}
            />

            <div className="grid grid-cols-2 gap-2">
                <FormInput
                    type="text"
                    name="t1runs"
                    label={`${match?.team1?.shortname} score`}
                    value={t1runs}
                    onFieldChange={onFieldChange}
                    required={status === "completed"}
                />
                <FormInput
                    type="number"
                    name="t1overs"
                    label={`${match?.team1?.shortname} overs`}
                    value={t1overs}
                    onFieldChange={onFieldChange}
                    required={status === "completed"}
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <FormInput
                    type="text"
                    name="t2runs"
                    label={`${match?.team2?.shortname} score`}
                    value={t2runs}
                    onFieldChange={onFieldChange}
                    required={status === "completed"}
                />
                <FormInput
                    type="number"
                    name="t2overs"
                    label={`${match?.team2?.shortname} overs`}
                    value={t2overs}
                    onFieldChange={onFieldChange}
                    required={status === "completed"}
                />
            </div>
        </Form>
    );
};
