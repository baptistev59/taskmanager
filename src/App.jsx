import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from './context/AuthProvider.jsx'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto p-4">
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
        </Routes>
        </AuthProvider>
      </main>
      <Footer />
    </div>
  )
}

export default App;
