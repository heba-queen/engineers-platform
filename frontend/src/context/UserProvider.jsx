import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUserInfo(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ userInfo, login, logout , loading  }}>
       {!loading && children} 
    </UserContext.Provider>
  );
};

export default UserProvider;
