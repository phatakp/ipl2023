import axios from "axios";
import { IAPIError } from "interfaces/error";
import { refreshToken } from "services/auth";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 5000,
    withCredentials: true,
});

api.defaults.headers.common["Content-Type"] = "application/json";

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const errMessage = error.response.data?.errors?.[0] as IAPIError;

        if (errMessage?.code === "token_not_valid" && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshToken();
                return api(originalRequest);
            } catch {
                window.location.href = "/auth/login";
            }
        }
        if (
            error.response.status === 401 &&
            errMessage?.code !== "no_active_account"
        )
            window.location.href = "/auth/login";
        return Promise.reject(error);
    }
);

export default api;
