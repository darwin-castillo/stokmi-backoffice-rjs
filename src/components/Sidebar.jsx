import { Home, Users, Settings, BarChart3, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Sidebar = ({ isOpen, setIsOpen }) => {
    const { logout } = useAuth();
    return (
        <aside className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
      lg:relative lg:translate-x-0 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>

            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div className="text-2xl font-bold">
                    Min<span className="text-blue-500">ventory</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="lg:hidden">
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <SidebarLink to="/" icon={<Home size={20} />} label="Dashboard" onClick={() => setIsOpen(false)} />
                <SidebarLink to="/usuarios" icon={<Users size={20} />} label="Usuarios" onClick={() => setIsOpen(false)} />
                {/* ...otros links */}
            </nav>

            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 p-3 rounded-lg text-sm text-red-500 hover:text-red-700 font-medium pw-"
                >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </nav>
        </aside>
    );
};


const SidebarLink = ({ to, icon, label, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-lg  hover:bg-slate-800} transition-colors`}
    >
        {icon}
        <span>{label}</span>
    </Link>
);
export default Sidebar;