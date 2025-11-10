// obtenir le token actuel depuis le stockage local
export const getCurrentToken = () => {
  return localStorage.getItem("token");
};
