import {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Menu from './pages/Menu'
import CreateProduct from "./pages/CreateProduct.tsx";
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import SidebarMenu from "./components/SideBarMenu.tsx";


function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);


    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Header onToggleMenu={toggleMenu} />
                <SidebarMenu isOpen={menuOpen} />

                <main className={`pt-20 transition-all duration-300 ${
                    menuOpen ? 'ml-64' : 'ml-0'
                } p-4`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/create-product" element={<CreateProduct />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>

                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App