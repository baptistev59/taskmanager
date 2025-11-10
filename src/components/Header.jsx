import { Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate ('/login');
    }

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Gestionnaire de tâches</h1>
                <nav>
                    <Link className="mr-4" to="/">Accueil</Link>
                    {token && <Link className="mr-4" to="/tasks">Tâches</Link>}
                    {!token && <Link className="mr-4" to="/login">Connexion</Link>}
                    {!token && <Link className="mr-4" to="/register">Inscription</Link>}
                    {token && <button className="underline" onClick={handleLogout}>Déconnexion</button>}
                </nav>
            </div>
        </header>
    );
}
