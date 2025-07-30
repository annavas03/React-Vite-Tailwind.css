import React from "react";
import menu from '../assets/menu.png'


interface HeaderProps {
    onToggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleMenu }) => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-amber-200 shadow z-50 p-4 flex items-center justify-between">
            <button
                onClick={onToggleMenu}
                className="rounded-full hover:opacity-70 focus:outline-none"
            >
                <img src={menu} alt="menu" className="h-8 w-8" />
            </button>
            <h1 className="text-lg font-bold text-amber-500">Fancy Cafe</h1>
        </header>
    );
};

export default Header;
