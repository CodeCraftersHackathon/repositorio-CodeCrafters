import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { useToggle } from "../hooks/useToggle"
import { useContext } from "react";
import { PageContext } from "../context/App.context";
import { useNavigate } from "react-router-dom"
import { useToast } from "../hooks/useToast";

export const Header = () => {

    const navigate = useNavigate()

    const username = localStorage.getItem("username");
    const { darkTheme, toggleTheme, state, logout } = useContext(PageContext)
    const { toggle: toggleMenu, handleToggle: handleToggleMenu } = useToggle()

    const handleLogout = () => {
        useToast(200, "Sesión cerrada")
        logout()
    }

    const handleMenu = () => {
        handleToggleMenu(!toggleMenu)
    }

    return (
        <header className="bg-blue-950 border-b-2 z-10">
            <nav className='bg-blue-900 border-black text-white z-10'>
                <section className='flex justify-evenly h-12 items-center mx-auto container'>

                    {/*//! MENU */}
                    <button className='md:hidden rounded p-1 transition-colors hover:text-black hover:bg-green-50 focus:ring-1 focus:ring-slate-300 h-6 w-6 flex items-center justify-center'
                        onClick={handleMenu}
                        value={toggleMenu}
                    >
                        <i className="text-xl hover:border-black border-2 rounded" >
                            {toggleMenu ? <IoMenu /> : <IoCloseSharp />}
                        </i>
                    </button>

                    {/* //!LOGO */}
                    <div className='flex items-center -mr-10 font-gta space-x-1'>

                        <h2 className='text-lg font-bold' style={{ fontFamily: "JetBrains Mono, monospace" }}>
                            StudyMate
                        </h2>

                    </div>

                    <div className='flex items-center'>
                        {/* //!TEMA */}
                        <button className={`rounded-full p-3 mr-4 transition-colors focus:ring-2 h-6 w-6 flex items-center justify-center hover:bg-slate-100 border-2 bg-white ${!darkTheme ? "focus:ring-yellow-200 hover:bg-indigo-400" : "focus:ring-indigo-200 hover:bg-yellow-300"}`} onClick={() => toggleTheme(!darkTheme)}>

                            <i className={`${!darkTheme ? "text-yellow-500" : "text-indigo-600"} text-xl`} >
                                {!darkTheme ? < FiSun /> : <FiMoon />}
                            </i>
                        </button>

                        {/* //! USER */}
                        {state.logged ? (
                            <div className="flex items-center justify-center">
                                <img
                                    className='h-6 w-6 rounded-full'
                                    src={"https://ui-avatars.com/api?background=random&name=" + username} alt="User-Icon"
                                />
                                <button onClick={handleLogout} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100 px-3">
                                    <span className="relative text-white group-hover:text-border font-semibold">Cerrar Sesion</span>
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => navigate("/login")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100 px-3">
                                <span className="relative text-white group-hover:text-border font-semibold">Iniciar Sesion</span>
                            </button>
                        )}

                    </div>
                </section>
            </nav>
            {/* //! LINKS */}
            <section className={`bg-blue-900 text-start py-1 pb-1 border-t  transition  duration-300 "translate-x-0" md:translate-x-0 md:duration-0 w-full z-40 static md:static
                ${toggleMenu && "translate-x-[-100%] fixed"}`}>

                <ul className={`${state.logged ? "grid-cols-3" : "grid-cols-2"} grid-rows-1 md:grid md:text-center`}>

                    <li className="py-2">
                        <a href="#" onClick={() => navigate("/")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100  px-3">
                            <span className="relative text-white group-hover:text-border font-semibold">Home</span>
                        </a>
                    </li>

                    <li className="py-2">
                        <a href="#" onClick={() => navigate("/courses")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100  px-3">
                            <span className="relative text-white group-hover:text-border font-semibold">Cursos</span>
                        </a>
                    </li>

                    {state.logged ?
                        (
                            <>
                                <li className="py-2">
                                    <a href="#" onClick={() => navigate("/auth/profile")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100  px-3">
                                        <span className="relative text-white group-hover:text-border font-semibold">Profile</span>
                                    </a>
                                </li>
                            </>
                        ) : ""
                    }

                </ul>

            </section>

        </header >
    )
}