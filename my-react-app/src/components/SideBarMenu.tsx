import React from "react";
import { Link } from "react-router-dom";

interface SidebarMenuProps {
    isOpen: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen }) => {
    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-yellow-100 text-white p-4 z-40 transform transition-transform duration-300 pt-16 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <nav className="space-y-2 mt-13">
                <Link to="/" className="block px-4 py-2 rounded no-underline text-orange-500 hover:bg-yellow-500">Головна</Link>
                <Link to="/menu" className="block px-4 py-2 rounded no-underline text-orange-500 hover:bg-yellow-500">Меню</Link>
                <Link to="/profile" className="block px-4 py-2 rounded no-underline text-orange-500 hover:bg-yellow-500">Профіль</Link>
                <Link to="/create-product" className="block px-4 py-2 rounded no-underline text-orange-500 hover:bg-yellow-500">Створити!</Link>
            </nav>
        </aside>
    );
};

export default SidebarMenu;