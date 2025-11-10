import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

/**
 * Fournisseur du contexte d'authentification
 * @param {*} param0 
 * @returns 
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const updateToken = (newToken) => {
    if (newToken) localStorage.setItem("token", newToken);
    else localStorage.removeItem("token");
    setToken(newToken);
  };

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
