import { useEffect } from "react";
import { useContext } from "react";

const { createContext } = require("react");

const authContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {});

  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      const session = await fetch(`${process.env.VITE_DB_URI}/api/auth/me`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: { token: token },
      });
      return session ? { ...session, token: token } : null;
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (userinfo) => {
    try {
      const response = await fetch(
        `${process.env.VITE_DB_URI}/api/auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: userinfo,
        }
      );
      if (response.status === 200) {
        setUser("200 ! ");
        setUser({ ...response, token: response.token });
        localStorage.setItem("token", response.token);
        checkUser();
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
    user: user,
  };

  return (
    <authContext.Provider value={contextValues}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
