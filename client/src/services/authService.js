import api from "./api";

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (payload) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email
  });

  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    { password }
  );

  return response.data;
};

export const forceResetPassword = async (password) => {
  const response = await api.post(
    "/auth/force-reset-password",
    { password }
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};