import api from "./axios";

export const getTeams = () => {
    return api.get("/teams/").then((resp) => resp.data);
};
