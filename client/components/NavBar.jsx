import { FaHome } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMdBookmarks } from "react-icons/io";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PageContext } from "../../context/App.context";
import { useToast } from "../../hooks/useToast";
import { ToolTip } from "../ui/ToolTip";

export const NavBar = () => {

    const navigate = useNavigate()

    const { state, logout } = useContext(PageContext)

    const handleLogout = () => {
        useToast(200, "Sesión cerrada");
        logout();
    };

    return (
        <nav className="w-fit bg-blue-900 h-screen fixed shadow-xl pt-14">
            {/* Links */}
            <ul className="flex flex-col justify-start text-left space-y-5 pt-5">
                <li className="px-2" title="Inicio">
                    <a href="#" onClick={() => navigate("/")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-blue-400 before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100">
                        <span className="flex items-center space-x-2 group relative text-3xl text-white group-hover:text-border font-semibold">
                            <FaHome />
                            {/* <span className="text-xl transition-all duration-300 opacity-0 w-0 group-hover:w-fit group-hover:opacity-100">Inicio</span> */}
                        </span>
                    </a>
                </li>

                {state.logged ?
                    (
                        <>

                            <li className="px-2" title="Cursos">
                                <a href="#" onClick={() => navigate("/courses")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-blue-400 before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100">
                                    <span className="flex items-center space-x-2 group relative text-3xl text-white group-hover:text-border font-semibold">
                                        <IoMdBookmarks />
                                        {/* <span className="text-xl transition-all duration-300 opacity-0 w-0 group-hover:w-fit group-hover:opacity-100">Cursos</span> */}
                                    </span>
                                </a>
                            </li>

                            <li className="px-2" title="Perfil">
                                <a href="#" onClick={() => navigate("/auth/profile")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-blue-400 before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100">
                                    <span className="flex items-center space-x-2 group relative text-3xl text-white group-hover:text-border font-semibold">
                                        <CgProfile />
                                        {/* <span className="text-xl transition-all duration-300 opacity-0 w-0 group-hover:w-fit group-hover:opacity-100">Perfil</span> */}
                                    </span>
                                </a>
                            </li>

                            <li className="px-1" title="Cerrar Sesión">
                                <a href="#" onClick={handleLogout} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-blue-400 before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100">
                                    <span className="flex items-center space-x-2 group relative text-3xl text-white group-hover:text-border font-semibold">
                                        <TbLogout2 />
                                        {/* <span className="text-xl transition-all duration-300 opacity-0 h-0 w-0 group-hover:w-fit group-hover:h-fit group-hover:opacity-100">Cerrar Sesión</span> */}
                                    </span>
                                </a>
                            </li>

                        </>
                    ) : ""
                }
                {!state.logged && (
                    <li className="px-1" title="Iniciar Sesión">
                        <a href="#" onClick={() => navigate("/login")} className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-blue-400 before:transition before:duration-300 hover:before:origin-left hover:before:scale-x-100">

                            <span className="flex items-center space-x-2 group relative text-4xl text-white group-hover:text-border font-semibold">
                                <IoLogInOutline />
                                {/* <span className="text-xl transition-all duration-300 opacity-0 w-0 group-hover:w-fit group-hover:opacity-100">Iniciar Sesión</span> */}
                            </span>

                        </a>
                    </li>
                )}

            </ul>
        </nav>
    )
}
