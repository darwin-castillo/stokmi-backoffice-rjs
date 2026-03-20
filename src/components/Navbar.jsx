import { Bell, UserCircle, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const styles = {
    header: "h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10",
    menuBtn: "p-2 hover:bg-gray-100 rounded-lg lg:hidden text-gray-600",
    rightGroup: "flex items-center gap-2 lg:gap-4",
    bell: "text-gray-600 cursor-pointer",
    divider: "h-8 w-px bg-gray-200 mx-2 hidden sm:block",
    text: "text-sm font-medium text-gray-700 hidden sm:block",
    userIcon: "text-gray-400"
};

const Navbar = ({ toggleSidebar }) => {
    const { user } = useAuth();
    return (
        <header className={styles.header}>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className={styles.menuBtn}
                >
                    <Menu size={24} />
                </button>
            </div>

            <div className={styles.rightGroup}>
                <Bell size={20} className={styles.bell} />
                <div className={styles.divider}></div>
                <span className={styles.text}>{user?.name || 'Administrador'}</span>
                <UserCircle size={28} className={styles.userIcon} />
            </div>
        </header>
    );
};

export default Navbar;