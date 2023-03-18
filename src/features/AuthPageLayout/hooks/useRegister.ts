import { IRegisterData } from "interfaces/auth";
import { IAPIError } from "interfaces/error";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "services/auth";

export const useRegister = () => {
    const navigate = useNavigate();

    const { mutate: registerUser, isLoading } = useMutation(
        (userData: IRegisterData) => register(userData),
        {
            onSuccess: (data) => {
                //  query.refetch();
                toast.success("User registered successfully. Please login");
                navigate("/auth/login");
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

    return { registerUser, isLoading };
};
