import api from "./api";

export const getTeams = async () => {
  const response = await api.get(
    "/teams/"
  );

  return response.data;
};

export const createTeam = async (
  payload
) => {
  const response = await api.post(
    "/teams/",
    payload
  );

  return response.data;
};

export const joinTeam = async (
  teamId
) => {
  const response = await api.post(
    `/teams/${teamId}/join`
  );

  return response.data;
};

export const leaveTeam = async (
  teamId
) => {
  const response = await api.post(
    `/teams/${teamId}/leave`
  );

  return response.data;
};

export const getTeamMembers = async (
  teamId
) => {
  const response = await api.get(
    `/teams/${teamId}/members`
  );

  return response.data;
};

export const addMemberToTeam = async (
  teamId,
  userId
) => {
  const response = await api.post(
    `/teams/${teamId}/members`,
    {
      user_id: userId
    }
  );

  return response.data;
};