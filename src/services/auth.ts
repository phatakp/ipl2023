import {
    IChangePwdData,
    IChangeWinnerData,
    ILoginResponse,
    IResetPwdData,
} from "interfaces/auth";
import api from "./axios";

export const login = (data: object) => {
    return api.post("/auth/token/", data).then((resp) => resp.data);
};

export const register = (data: object) => {
    return api.post("/auth/register/", data).then((resp) => resp.data);
};

export const refreshToken = async () => {
    return api
        .post<ILoginResponse>("/auth/token/refresh/")
        .then((resp) => resp.data);
};

export const logout = (token: string | undefined) => {
    return api
        .post("/auth/token/logout/", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const getUsers = (token: string | undefined) => {
    return api
        .get("/auth/users/", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const getUser = (token: string | undefined) => {
    return api
        .get("/auth/user/", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const changeUserPwd = (
    token: string | undefined,
    data: IChangePwdData
) => {
    return api
        .patch("/auth/change-password/", data, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const resetUserPwd = (data: IResetPwdData) => {
    const { id, ...resetData } = data;
    return api
        .patch(`/auth/reset-password/${id}/`, resetData)
        .then((resp) => resp.data);
};

export const changeWinner = (
    token: string | undefined,
    data: IChangeWinnerData
) => {
    return api
        .patch("/auth/change-winner/", data, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const validateUser = (email: string) => {
    return api.get(`/auth/validate/${email}/`).then((resp) => resp.data);
};

export const userAmountPaid = (
    token: string | undefined,
    email: string,
    paid: boolean
) => {
    return api
        .patch(
            `/auth/paid/${email}/`,
            { paid },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((resp) => resp.data);
};
