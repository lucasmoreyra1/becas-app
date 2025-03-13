import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, getUserRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const response = await getUserRequest(storedToken);
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user:", error);
          signOut();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const signIn = async (credentials) => {
    try {
      const { data } = await loginRequest(credentials);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsAuthenticated(true);

      const userResponse = await getUserRequest(data.token);
      setUser(userResponse.data);
      setErrors(null);
      return { success: true };
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || "Error al iniciar sesión");
      return { success: false };
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, errors, signIn, signOut, token, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
