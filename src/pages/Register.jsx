import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newErrors = [];

    if (!email.trim()) newErrors.push("L'email est obligatoire.");
    if (!password.trim()) newErrors.push("Le mot de passe est obligatoire.");

    // Vérification format email simple
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.push("L'adresse email n'est pas valide.");

    setErrors(newErrors);

    if (newErrors.length > 0) return;

   
    // Formulaire OK
    await axios.post('http://localhost:3000/register', { email, password })
    navigate('/login'); 
    console.log({ email, password });

  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>

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
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
