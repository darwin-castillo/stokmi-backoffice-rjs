import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const styles = {
    wrapper: "flex min-h-screen bg-gray-50",
    overlay: "fixed inset-0 bg-black/50 z-20 lg:hidden",
    mainContainer: "flex-1 flex flex-col min-w-0",
    content: "p-4 lg:p-8"
};

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={styles.wrapper}>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            {isSidebarOpen && (
                <div
                    className={styles.overlay}
                    onClick={toggleSidebar}
                ></div>
            )}

            <div className={styles.mainContainer}>
                <Navbar toggleSidebar={toggleSidebar} />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;