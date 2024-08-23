import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useToggle } from "../../hooks/useToggle"
import { useContext } from "react";
import { PageContext } from "../../context/App.context";
import { useNavigate } from "react-router-dom";
import logo from "/logotipo.png";
import { useToast } from "../../hooks/useToast";

export const Header = () => {

    const navigate = useNavigate()

    const username = localStorage.getItem("username");
    const { state, logout } = useContext(PageContext)
    const { toggle: toggleMenu, handleToggle: handleToggleMenu } = useToggle()

    const handleLogout = () => {
        useToast(200, "Sesión cerrada")
        logout()
    }

    const handleMenu = () => {
        handleToggleMenu(!toggleMenu)
    }

    return (
        <header className="bg-blue-950 ">
            <nav className='bg-blue-900 border-black text-white'>
                <section className='flex justify-between h-12 items-center md:mx-auto container'>

                    {/*//! MENU */}
                    <button className='md:hidden rounded m-2 transition-colors hover:text-blue-950 hover:bg-blue-50 focus:ring-1 h-6 w-6 flex items-center justify-center'
                        onClick={handleMenu}
                        value={toggleMenu}
                    >
                        <i className="text-xl hover:border-blue border-1 rounded" >
                            {toggleMenu ? <IoMenu /> : <IoCloseSharp />}
                        </i>
                    </button>

                    {/* //!LOGO */}
                    <div className='flex items-center sm=justify-center sm:position-absolute font-gta '>
                        <a onClick={() => navigate("/")} className='text-2xl font-bold cursor-pointer' style={{ fontFamily: "JetBrains Mono, monospace" }} title="Volver al inicio">
                            <img src={logo} alt="Logo CodeTrain" width={128} height={128} />
                        </a>
                    </div>

                    <div className='flex items-center'>

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
                            
                            <div className={`py-3 hidden md:block relative cursor-pointer hover:bg-blue-950   transition duration-200`}>
                            <a onClick={() => navigate("/login")} className="group relative px-3">
                              <span className="relative text-white font-semibold">
                                Iniciar Sesion
                              </span>
                            </a>
                          </div>
                             
                        )}

                    </div>
                </section>
            </nav>
            {/* //! LINKS */}
            <section className={`bg-blue-900 text-start  transition  duration-300 "translate-x-0" md:translate-x-0 md:duration-0 w-full z-40 static md:static
                ${toggleMenu && "translate-x-[-100%] fixed"}`}>

                <ul className={`${state.logged ? "grid-cols-3" : "grid-cols-2"} grid-rows-1 md:grid md:text-center`}>
                <li className="py-2 md:hidden">
                    <a href="#" onClick={() => navigate("/")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100  px-3">
                    <span className="relative text-white group-hover:text-border font-semibold">Home</span>
                    </a>
                </li>
                <li className="py-2 md:hidden">
                    <a href="#" onClick={() => navigate("/auth/todo")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100  px-3">
                    <span className="relative text-white group-hover:text-border font-semibold">ToDo</span>
                    </a>
                </li>
                {state.logged ?
                    (
                    <li className={`py-2 md:block hidden`}>
                        <a href="#" onClick={() => navigate("/auth/perfil")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100  px-3">
                        <span className="relative text-white group-hover:text-border font-semibold">Profile</span>
                        </a>
                    </li>
                    ) : ""
                }

                {!state.logged ?
                    (
                    <li className={`py-2 md:hidden`}>
                        <a onClick={() => navigate("/login")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-ipf-green-l before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100 px-3">
                            <span className="relative text-white group-hover:text-border font-semibold">Iniciar Sesion</span>
                        </a> 
                    </li>
                    ) : ""
                }
         

                    {/* //! USER */}
    



                </ul>
            </section>

            

        </header >
    )
}