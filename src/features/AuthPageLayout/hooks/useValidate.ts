import { IUserShort } from "interfaces/auth";
import { IAPIError } from "interfaces/error";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateUser } from "services/auth";

export const useValidate = () => {
    const navigate = useNavigate();

    const { mutate: validateUserEmail, isLoading } = useMutation(
        (email: string) => validateUser(email),
        {
            onSuccess: (data: Partial<IUserShort>) => {
                const { id } = data;
                navigate("/auth/reset-password", {
                    state: { id },
                });
            },
            onError: (error: any) => {
                if (Array.isArray((error as any).response.data.errors)) {
                    (error as any).response.data.errors.forEach(
                        (el: IAPIError) => toast.error(el.detail)
                    );
                } else {
                    toast.error((error as any).response.data.errors[0].detail);
                }
            },
        }
    );

    return { validateUserEmail, isLoading };
};
