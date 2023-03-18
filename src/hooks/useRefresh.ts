import { useMutation } from "react-query";
import { refreshToken } from "services/auth";

export const useRefresh = () => {
    const {
        mutate: refresh,
        isLoading,
        data,
        isError,
    } = useMutation(refreshToken);

    return { refresh, isLoading, data, isError };
};
