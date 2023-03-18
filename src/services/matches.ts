import { IMatchChangeData } from "interfaces/matches";
import { IPredictionData } from "interfaces/predictions";
import api from "./axios";

export const getMatches = () => {
    return api.get("/matches/").then((resp) => resp.data);
};

export const getMatchByNum = (num: number | undefined) => {
    return api.get(`/matches/${Number(num)}/`).then((resp) => resp.data);
};

export const getMatchWinProbability = (num: number) => {
    return api.get(`/matches/probability/${num}/`).then((resp) => resp.data);
};

export const getMatchPredictions = (token: string | undefined, num: number) => {
    return api
        .get(`/predictions/?match=${num}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const getUserPredictions = (token: string | undefined) => {
    return api
        .get(`/predictions/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const getUserPredictionForMatch = (
    token: string | undefined,
    matchNum: number
) => {
    return api
        .get(`/predictions/user/${matchNum}/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const addUserPrediction = (
    token: string | undefined,
    data: IPredictionData
) => {
    return api
        .post(`/predictions/`, data, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const updateUserPrediction = (
    token: string | undefined,
    data: IPredictionData
) => {
    const { id, ...predData } = data;
    return api
        .patch(`/predictions/${id}/`, predData, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const updateMatchData = (
    token: string | undefined,
    data: IMatchChangeData
) => {
    const { matchNum, ...matchData } = data;
    return api
        .patch(`/matches/${matchNum}/`, matchData, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => resp.data);
};

export const doublePrediction = (token: string | undefined, id: number) => {
    return api
        .patch(
            `/predictions/double/${id}/`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((resp) => resp.data);
};
