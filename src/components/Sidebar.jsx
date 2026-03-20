import { Home, Users, Settings, BarChart3, X, LogOut, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useGlobal } from '../hooks/useGlobal';
import { cn } from '../utils/cn';

const styles = {
    aside: "fixed inset-y-0 left-0 z-30 w-64 bg-slate-800 text-white/70 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
    asideOpen: "translate-x-0",
    asideClosed: "-translate-x-full",
    header: "flex items-center justify-between p-6 border-slate-800",
    logoText: "text-2xl font-bold text-white",
    logoAccent: "font-semibold text-amber-600",
    closeBtn: "lg:hidden",
    nav: "flex-1 p-4 space-y-2",
    logoutBtn: "flex items-center gap-3 p-3 rounded-lg text-sm text-red-500 hover:text-red-700 font-medium",
    section: "px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider",
    linkBase: "flex items-center gap-3 p-3 rounded-lg transition-colors",
    linkActive: "bg-slate-950 text-white",
    linkInactive: "hover:bg-slate-600"
};


const Sidebar = ({ isOpen, setIsOpen }) => {
    const { logout } = useAuth();
    const [selected, setSelected] = useState("Dashboard");
    const { selectedRoute } = useGlobal();

    const handleSelected = (label) => {
        setSelected(label);
        setIsOpen(false);
    }


    return (
        <aside className={cn(styles.aside, isOpen ? styles.asideOpen : styles.asideClosed)}>
            <div className={styles.header}>
                <div className={styles.logoText}>
                    Stok<span className={styles.logoAccent}>mi</span>
                </div>
                <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                    <X size={24} />
                </button>
            </div>

            <nav className={styles.nav}>
                <SidebarLink isSelected={selected === "Dashboard"} to="/" icon={<Home size={20} />} label="Dashboard" onClick={() => handleSelected("Dashboard")} />
                <SidebarSection title="Gestión" />
                <SidebarLink isSelected={selected === "Usuarios"} to="/users" icon={<Users size={20} />} label="Usuarios" onClick={() => handleSelected("Usuarios")} />
                <SidebarLink isSelected={selected === "Productos" || selectedRoute === "products"} to="/products" icon={<Package size={20} />} label="Productos" onClick={() => handleSelected("Productos")} />
            </nav>

            <nav className={styles.nav}>
                <button
                    onClick={logout}
                    className={styles.logoutBtn}
                >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </nav>
        </aside>
    );
};

const SidebarSection = ({ title }) => (
    <div className={styles.section}>
        {title}
    </div>
);


const SidebarLink = ({ to, icon, label, onClick, isSelected }) => (
    <Link
        to={to}
        onClick={onClick}
        className={cn(styles.linkBase, isSelected ? styles.linkActive : styles.linkInactive)}
    >
        {icon}
        <span>{label}</span>
    </Link>
);

export default Sidebar;