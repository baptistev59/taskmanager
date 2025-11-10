import { Link } from "react-router-dom";
import api from "../services/api";

export default function Task({ task , onUpdate }) {
    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
        } catch (err) {
            console.error("Erreur lors de la suppression de la tache :", err);
        }
        if (onUpdate) {
            onUpdate();
        }
    };
    const markAsFinished = async (id) => {
        try {
            await api.patch(`/tasks/${id}`, { status: "done" });
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la tache :", err);
        }
        if (onUpdate) {
            onUpdate();
        }
    };
    return (
        <div className="border rounded p-4 mb-3 shadow flex justify-between items-center bg-white hover:bg-gray-50 transition">
            <div>
                    <div className="flex items-center gap-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${task.status === "done" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{task.status === "done" ? "Terminee" : "À faire"}</span>
                            <Link className="text-lg font-semibold ">{task.title}</Link>
                        </div>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            </div>
            <div className="flex gap-2">
                {task.status === "todo" && <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => markAsFinished(task.id)}>Terminer</button>}
                <Link className="bg-yellow-500 text-white px-3 py-1 rounded" to={`/edit/${task.id}`}>Modifier</Link>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteTask(task.id)}>Supprimer</button>
                </div>
                </div>
         );
}