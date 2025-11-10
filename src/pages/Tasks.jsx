import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task.jsx";
import api from "../services/api.jsx";


export default function Tasks() {   

    const [tasks, setTasks] = useState([]) ;

    const fetchTasks = async () => {
            const response = await api.get('/tasks');
            console.log(response.data);
            setTasks(response.data);
        
    };
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Mes Tâches</h2>
      <Link
        className="inline-block mb-4 text-blue-600 underline"
        to="/create"
      >
        + Nouvelle tâche
      </Link>

      {tasks.length > 0 ? (
        tasks.map((task) => <Task task={task} key={task.id} onUpdate={fetchTasks}/>)
      ) : (
        <p className="text-gray-600">Aucune tâche pour le moment.</p>
      )}
    </div>
  );
}   