import React from "react";
import menu from '../assets/menu.png'


interface HeaderProps {
    onToggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleMenu }) => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 p-4 flex items-center justify-between">
            <button
                onClick={onToggleMenu}
                className="text-gray-600 hover:text-gray-500 focus:outline-none"
            >
                <img src={menu} alt="menu" className="h-8 w-8" />
            </button>
            <h1 className="text-lg font-bold">Мій сайт</h1>
        </header>
    );
};

export default Header;
