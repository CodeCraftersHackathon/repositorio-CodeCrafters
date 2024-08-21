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
            <div className="">

                <div className="flex flex-col h-screen w-full" >

                    <Header />
                    <ToastContainer />

                    <main className={`bg-gray-200'} 
                    mx-auto text-center w-full flex-1 flex-col pl-12 pt-14`}>
                        <section className="z-10">
                            {children}
                        </section>
                    </main>
                    <Footer />
                </div >
            </div>
        </>
    )
}