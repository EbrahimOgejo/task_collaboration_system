import api from "./api";

export const getTeams = async () => {
  const response = await api.get("/teams/");
  return response.data;
};

export const createTeam = async (payload) => {
  const response = await api.post("/teams/", payload);
  return response.data;
};

export const joinTeam = async (id) => {
  const response = await api.post(`/teams/${id}/join`);
  return response.data;
};

export const leaveTeam = async (id) => {
  const response = await api.post(`/teams/${id}/leave`);
  return response.data;
};