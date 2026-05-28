import api from "./api";

export const getUsers = async () => {
  const response = await api.get(
    "/admin/users"
  );

  return response.data;
};

export const createUser = async (
  payload
) => {
  const response = await api.post(
    "/admin/users",
    payload
  );

  return response.data;
};

export const toggleUserStatus = async (
  userId
) => {
  const response = await api.patch(
    `/admin/users/${userId}/toggle-status`
  );

  return response.data;
};

export const deleteUser = async (
  userId
) => {
  const response = await api.delete(
    `/admin/users/${userId}`
  );

  return response.data;
};