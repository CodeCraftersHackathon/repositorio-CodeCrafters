import { useState, useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PageContext } from "../../context/App.context";
import { useForm } from '../../hooks/newUseForm.js';


export const Modal = ({ btnIcon, message, title, btnText, children, form, onSubmit, submitFunction, otherClass, tip, }) => {

    const { darkTheme } = useContext(PageContext)
    const [isOpen, setOpen] = useState(false);
    const [animation, setAnimation] = useState(true);
    const { handleSubmit } = useForm()

    const openModal = () => {
        setAnimation(true);
        setTimeout(() => {
            setOpen(true);
        }, 100);
    }

    const closeModal = () => {
        setAnimation(false);
        setTimeout(() => {
            setOpen(false);
        }, 100);
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-scree">
            <button 
                onClick={openModal} 
                className={`${otherClass} group relative flex items-center justify-center gap-2 w-60 h-16 p-4 rounded-full border-none transition-all duration-450 ease-in-out transform bg-blue-900 text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-950 hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4),inset_0px_-4px_0px_rgba(0,0,0,0.2),0px_0px_0px_4px_rgba(255,255,255,0.2),0px_0px_180px_0px_#9917FF] hover:-translate-y-0.5`} 
                title={tip}
            >
                <span className="relative z-10 transition-all duration-450 ease-in-out group-hover:text-white">
                {btnText}
                </span>
                <span className="relative z-10 transition-all duration-800 ease-in-out group-hover:fill-white group-hover:scale-120">
                {btnIcon}
                </span>
            </button>
            </div>




            {isOpen && (
                <div className={`fixed inset-0 flex justify-center items-center transition-all bg-black/30 opacity-0
                    duration-200 ease-in-out z-50 backdrop-blur-sm ${animation ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}
                >
                    {/* CONTENIDO */}
                    <div
                        className={`${darkTheme ? "bg-white" : "bg-slate-700"} rounded-lg text-left overflow-hidden shadow-lg transition-all mx-8 sm:max-w-lg duration-300 text-slate-800
                            ${animation ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}
                            `}>

                        <div className="py-2 flex  justify-end pr-1 cursor-pointer">
                            <i onClick={closeModal} className={`${darkTheme ? "text-slate-700" : "text-neutral-200"} text-2xl hover:text-blue-700 overflow-hidden`}>
                                <IoIosCloseCircleOutline />
                            </i>
                        </div>

                        {form ? (
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

                                <div className={`${darkTheme ? "bg-white" : "bg-slate-600"} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                                    <div className="sm:flex sm:items-start">

                                        <div className={`${darkTheme ? "border-blue-300 bg-blue-100" : "border-blue-600 bg-blue-400"} mx-auto flex items-center justify-center rounded-full sm:mx-0 h-10 w-10 border-2`}>
                                            {btnIcon}
                                        </div>

                                        <div className="text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left">

                                            <h3 className={`${darkTheme ? "text-gray-900" : "text-neutral-100"} text-lg font-medium`}>{title}</h3>

                                            <div className="flex flex-col">
                                                {children}
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className={`${darkTheme ? "bg-gray-100" : "bg-slate-700"} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2 mx-auto gap-y-2`}>

                                    <button type="button" onClick={closeModal} className="w-full px-4 py-2 my-2 rounded-md hover:bg-gray-400 bg-slate-200 font-medium sm:text-sm transition-all duration-300">
                                        Cancelar
                                    </button>

                                    <button type="submit" onClick={closeModal} className="w-full px-4 py-2 my-2 rounded-md bg-blue-700 hover:bg-blue-600 font-medium sm:text-sm text-white transition-all duration-300">
                                        Confirmar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className={`${darkTheme ? "bg-white" : "bg-slate-600"} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                                    <div className="sm:flex sm:items-start">

                                        <div className={`${darkTheme ? "bg-blue-100 border-blue-300" : "bg-blue-400 border-blue-600"} border-2 mx-auto text-black flex items-center justify-center rounded-full sm:mx-0 h-10 w-10`}>
                                            {btnIcon}
                                        </div>

                                        <div className="text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left">

                                            <h3 className={`${darkTheme ? "text-gray-900" : "text-neutral-100"} text-lg font-medium`}>{title}</h3>

                                            <div className="mt-2">
                                                <p className={`${darkTheme ? "text-gray-500" : "text-neutral-200"} text-sm`}>{message}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className={`${darkTheme ? "bg-gray-100" : "bg-slate-700"} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2 mx-auto gap-y-2`}>

                                    <button type="button" onClick={closeModal} className="w-full px-4 py-2 my-2 rounded-md hover:bg-gray-400 bg-slate-200 font-medium sm:text-sm transition-all duration-300">
                                        Cancelar
                                    </button>

                                    <button type="submit" onClick={submitFunction} className="w-full px-4 py-2 my-2 rounded-md bg-blue-700 hover:bg-blue-600 font-medium sm:text-sm text-white transition-all duration-300">
                                        Confirmar
                                    </button>

                                </div>
                            </>
                        )}
                    </div >
                </div >)}

        </>
    );
};
