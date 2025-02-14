import { useEffect, useState, useContext, createContext } from "react";

const authContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser().then(() => setIsLoading(false));
  }, []);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      const session = await fetch(
        `${import.meta.env.VITE_DB_URI}/api/auth/me`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (session.ok) {
        const data = await session.json();
        setUser({ ...data, token: token });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (userinfo) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URI}/api/auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userinfo),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        checkUser();
      } else if (response.status === 401) {
        console.log("error 401");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (userinfo) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URI}/api/auth/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userinfo),
        }
      );
      if (response.ok) {
        console.log("response ok !");
      } else if (response.status === 401) {
        console.log("error 401");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const contextValues = {
    login,
    logout,
    register,
    user: user,
  };

  return (
    <authContext.Provider value={contextValues}>
      {isLoading ? "loading...." : children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
