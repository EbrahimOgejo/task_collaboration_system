import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const createUser = async (payload) => {
  const response = await api.post(
    "/admin/create-user",
    payload
  );

  return response.data;
};

export const toggleUserStatus = async (
  id,
  isActive
) => {
  const endpoint = isActive
    ? `/admin/deactivate/${id}`
    : `/admin/activate/${id}`;

  const response = await api.put(endpoint);

  return response.data;
};