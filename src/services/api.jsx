import axios from "axios";
import { toast } from "react-hot-toast";
import { getCurrentToken } from "../utils/authHelpers.jsx";

// Création d'une instance axios avec une URL de base
const api = axios.create({
    baseURL: "http://localhost:3000",
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use((config) => {
    const token = getCurrentToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur global pour détecter les erreurs 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Supprime le token
            localStorage.removeItem("token");

            // Sauvegarde un message temporaire
            localStorage.setItem("sessionExpired", "true");

            // Redirige vers la page login

            toast.error("Votre session a expiré !");
            window.location.replace("/login");

        }
        return Promise.reject(error);
    }
);

export default api;
