import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const authContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState(0);

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
        return true;
      } else if (response.status === 401) {
        console.log("error 401");
        console.log(response);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const updateWallet = async (amount)=> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_DB_URI}/api/auth/wallet/update`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({amount}),
        }
      );
      if (response.ok) {
        setWallet(response.data.amount)
        return true; 
      } else if (response.status === 400) {
        // toast.warn(response.message)
        return false;
      }
    } catch (err) {
      toast.warn('Error')
      return err;
    }
  }

  const contextValues = {
    login,
    logout,
    register,
    user: user,
    updateWallet,
    setWallet,
  };

  return (
    <authContext.Provider value={contextValues}>
      {isLoading ? "loading...." : children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
