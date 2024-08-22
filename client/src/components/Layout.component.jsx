import { Footer } from "./Footer.component"
import { Header } from "./Header.component"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageContext } from "../context/App.context";
import { useToast } from "../hooks/useToast";

export const Layout = ({ children }) => {

    const navigate = useNavigate()

    const location = useLocation();

    const { state, logout } = useContext(PageContext)

    const handleLogout = () => {
        useToast(200, "Sesión cerrada");
        logout();
    };

    const { darkTheme } = useContext(PageContext)

    useEffect(() => {
        if (location.pathname === "/") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [location.pathname]);

    return (
        <>
            <div className="h-screen">
                <div className="flex flex-col h-full min-h-screen w-full" >

                    <Header />
                    <ToastContainer />
                    <main className={`flex flex-grow text-center bg-slate-800 min-w-screen z-10 p-10 justify-center items-center'}`}>
                        {children}
                    </main>
                </div >
                <Footer />
            </div>
        </>
    )
}