import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";

// modifier une tache existante
export default function EditTask() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [originalTitle, setOriginalTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  // Récupérer les données de la tâche à modifier
    useEffect(() => {
        const fetchTask = async () => {
          try {
            const response = await api.get(`/tasks/${id}`);
            setTitle(response.data.title);
            setOriginalTitle(response.data.title);
            setDescription(response.data.description);
          } catch (err) {
            console.error("Erreur lors de la recherche de la tâche :", err);
          }
        };
        fetchTask();
      }, [id]);
    

  // Fonction pour soumettre le formulaire de modification
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      setLoading(true);
      await api.put(`/tasks/${id}`, { title, description, status: "todo" });
      toast.success("Tâche modifiée avec succès !");
      setTitle("");
      setDescription("");
      setTimeout(() => navigate("/tasks"), 800);
    } catch (err) {
      console.error("Erreur lors de la modification de la tâche :", err);
      toast.error("Erreur lors de la modification de la tâche !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-3/4 md:w-[700px] lg:w-[900px] bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
          Modifier la tâche "{originalTitle}"
        </h2>

        {/* Champ titre */}
        <div>
          <label
            htmlFor="title"
            className="block text-base sm:text-lg font-medium text-gray-700 mb-2"
          >
            Titre
          </label>
          <input
            id="title"
            type="text"
            placeholder="Entrez le titre de la tâche"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Champ description */}
        <div>
          <label
            htmlFor="description"
            className="block text-base sm:text-lg font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Décrivez la tâche..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border rounded-lg h-48 sm:h-64 lg:h-80 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 sm:py-4 px-6 rounded-lg text-white text-lg font-semibold transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Modification en cours..." : "Modifier la tâche"}
        </button>
      </form>
    </div>
  );
}
