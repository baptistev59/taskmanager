import { useState,useEffect } from "react";    
import { useNavigate } from "react-router-dom";
import { getCurrentToken } from "../utils/authHelpers.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import api from "../services/api.jsx";
import toast from "react-hot-toast";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const sessionExpired = localStorage.getItem("sessionExpired");
    if (sessionExpired) {
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      localStorage.removeItem("sessionExpired");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newErrors = [];

    if (!email.trim()) newErrors.push("L'email est obligatoire.");
    if (!password.trim()) newErrors.push("Le mot de passe est obligatoire.");

    // Vérification format email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.push("L'adresse email n'est pas valide.");

    setErrors(newErrors);

    if (newErrors.length > 0) return;

    // Formulaire OK
    try {
        const response = await api.post('/login', { email, password });
        const token = response.data.accessToken;
        if (!token) {
          toast.error("Token manquant dans la réponse du serveur.");
          return;
        }
        setToken(token);
        console.log({ email, password, token: getCurrentToken() });        
        navigate('/tasks');
    } catch (error) {
        if (error.status === 400) {
            setErrors(["Email ou mot de passe incorrect."]);
        }
      
        console.error(error);
    }

    
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>

      {/* Bloc erreurs */}
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          <ul className="list-disc ml-4">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
