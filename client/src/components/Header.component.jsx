// import { Icon } from "../ui/
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { FiSun, FiMoon } from "react-icons/fi";
import { useToggle } from "../hooks/useToggle";
import { useContext } from "react";
import { PageContext } from "../context/App.context";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/logotipo.png";

export const Header = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const { darkTheme, toggleTheme, state } = useContext(PageContext);
    const { toggle: toggleMenu, handleToggle: handleToggleMenu } = useToggle();

    const handleMenu = () => {
        handleToggleMenu(!toggleMenu);
    };

    return (
        <>
            <header className="bg-blue-900 border-slate-600 text-white border-b-1 pl-8 fixed z-40 w-full">

                <section className='flex items-center justify-between h-16 px-4 container mx-auto'>
                    {/* //! MENU */}
                    <button
                        className='md:hidden rounded p-1 transition-colors hover:text-black hover:bg-green-50 focus:ring-1 focus:ring-slate-300 h-8 w-8 flex items-center justify-center'
                        onClick={handleMenu}
                        value={toggleMenu}
                    >
                        {/* <Icon iconName={toggleMenu ? <IoMenu /> : <IoCloseSharp />} size='xl' color={"hover:border-black"} border={true} /> */}
                    </button>

                    {/* //! LOGO */}
                    <div className='flex items-center space-x-2 flex-grow justify-start'>

                        <img src={logo} alt="Logo CodeTrain" width={128} height={128} /> 

                        <a onClick={() => navigate("/")} className='text-2xl font-bold cursor-pointer' style={{ fontFamily: "JetBrains Mono, monospace" }} title="Volver al inicio">
                            
                        </a>
                    </div>

                    <div className='flex items-center space-x-4'>
                        {/* //! TEMA */}
                        <button
                            className={`rounded-full p-3 transition-colors focus:ring-2 h-8 w-8 flex items-center justify-center hover:bg-slate-100 border-2 bg-white ${!darkTheme ? "focus:ring-yellow-200 hover:bg-indigo-400" : "focus:ring-indigo-200 hover:bg-yellow-300"}`}
                            onClick={() => toggleTheme(!darkTheme)}
                        >
                            {/* <Icon iconName={!darkTheme ? <FiSun /> : <FiMoon />} color={`${!darkTheme ? "text-yellow-500" : "text-indigo-600"}`} size='xl' /> */}
                        </button>

                        {/* //! USER */}
                        {state.logged ? (
                            <img
                                className='h-8 w-8 rounded-full'
                                src={"https://ui-avatars.com/api?background=random&name=" + username}
                                alt="User-Icon"
                            />
                        ) : null}
                    </div>
                </section>

            </header>
        </>
    );
};
