import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  loginUser,
  getCurrentUser
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({
  children
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const login = async (
    credentials
  ) => {
    const data = await loginUser(
      credentials
    );

    localStorage.setItem(
      "access_token",
      data.access_token
    );

    localStorage.setItem(
      "refresh_token",
      data.refresh_token
    );

    setUser(data.user);

    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token =
        localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me =
          await getCurrentUser();

        setUser(me);
      } catch (err) {
        console.error(err);

        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token:
          localStorage.getItem(
            "access_token"
          ),
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);