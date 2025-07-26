import React from "react";
import { Link } from "react-router-dom";

interface SidebarMenuProps {
    isOpen: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen }) => {
    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 z-40 transform transition-transform duration-300 pt-16 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <h2 className="text-xl font-bold mb-4">Меню</h2>
            <nav className="space-y-2">
                <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700">Головна</Link>
                <Link to="/menu" className="block px-4 py-2 rounded hover:bg-gray-700">Меню</Link>
                <Link to="/profile" className="block px-4 py-2 rounded hover:bg-gray-700">Профіль</Link>
            </nav>
        </aside>
    );
};

export default SidebarMenu;