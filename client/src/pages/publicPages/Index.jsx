import React from 'react'
import { Layout } from '../../components/layout/Layout.component'
import { Cards } from "../../components/Cards.component"
import { useNavigate } from 'react-router-dom'
import { Footer } from "../../components/layout/Footer.component"
import { Header } from "../../components/layout/Header.component"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const Index = () => {

    const name = localStorage.getItem("username")
    const navigate = useNavigate()

    return (
        <>
            <div className="">
                <div className="flex flex-col h-full min-h-screen w-full" >
                    
                    <Header className='fixed' />
                    <ToastContainer />
                    <main className={` bg-blue-900 min-w-screen z-10  justify-center items-center'}`}>
                        {/* Inicio */}
                        <div className='bg-gradient-to-b from-blue-900 to-blue-950'>
                            <div className="md:grid md:grid-cols-2 sm:grid-cols-1 sm:bg-image sm:bg-cover" >
                            <div className="sm:text-center h-screen flex flex-col align-center justify-center pb-40">
                                    <div className='flex flex-col text-center'>
                                        <h1 class="text-5xl md:text-7xl font-bold text-blue-50 mb-4">Potenciamos tus ganas de estudiar!</h1>
                                        <h2 class="text-2xl md:text-3xl text-gray-200">Aprende a tu tiempo, organizate y enamorate de estudiar</h2>
                                    </div>
                                    <a href="#herramientas">
                                        <div className='flex justify-center'>
                                            <button className="bg-white text-blue-900 font-bold py-2 px-10 rounded-2xl mt-4 w-1/2 hover:bg-blue-950 hover:text-white hover:translate-x-0.5 duration-200" onClick={() => navigate("#herramientas")}>Empieza ahora</button>  
                                        </div>  
                                    </a>
                                    

                                </div>
                    
                                <div className="h-full">
                                    <img src="/robot.png" className="h-full w-full object-cover hidden md:block" alt="robot" />
                                </div>

                            </div>
                        </div>
                        {/* About */}
                        <div id= "about" className='bg-gray-900 shadow-slate-50 shadow-md md:flex py-10 w-full '>
                                <img src="/about.png" className='md:w-1/3 p-10 rounded' alt="about" />


                            <div className="text-center flex flex-col w-100 justify-center">
                                <h1 className="text-3xl md:text-3xl font-bold text-blue-50 mb-4">¿Qué es StudyMate?</h1>
                                <p className="text-xl md:text-3xl text-gray-200">
                                    StudyMate es una plataforma educativa potenciada por IA, brindandote herramientas para aprender lo que necesitas a tu propio ritmo.
                                </p>
                            </div>
                        </div>
                        {/* Nuestras Herramientas */}
                        <div id="herramientas" className='md:bg-gradient-to-b md:from-white md:to-blue-950 flex bg-white py-10 w-full h-screen  justify-center herramientas'>
                            <div className="text-center flex flex-col w-100">
                                <h1 className="text-3xl md:text-3xl font-bold text-blue-950 mb-4">Nuestras herramientas</h1>
                                <p className="text-xl md:text-3xl text-blue-900 p-10">
                                    Estas son algunas de las herramientas que te podemos brindar
                                </p>
                                <div className='flex justify-center w-full p-10 rounded-md bg-transparent'>
                                <div className="grid sm:grid-cols-1  md:grid-cols-5 md:grid-rows-1  gap-5">
                                    <Cards img={"/herramientas/opciones.png"} title={"Actividades de opcion multiple"} content={"Genera actividades multiple choice mediante inteligencia artificial en base a un tema que desees estudiar"} footer={false} nav={()=>navigate("/auth/multiplechoice")} />

                                    <Cards img={'/herramientas/libre.png'}content={"Genera preguntas sobre algun tema y mide tus conocimientos con la inteligencia artificial"} title={"Actividades de respuesta libre"} footer={false} nav={()=>navigate("/auth/preguntas")} />

                                    <Cards img={'/herramientas/resumir.png'} content={"Sube apuntes y obten resumenes explicativos mediante IA que te ayudaran marcando los puntos claves de la informacion"} title={"Resumir un texto"} footer={false} nav={()=>navigate("/auth/resumen")}/>

                                    <Cards img={'/herramientas/todo.png'} content={"Anota todos las actividades que tengas pendientes"} title={"ToDo"} footer={false} nav={()=>navigate("/auth/todo")} />
                                    
                                    <Cards img={'/herramientas/libreta.png'} content={"Lleva registros de tus calificaciones"} title={"Libreta"} footer={false} nav={()=>navigate("/auth/libreta")} />
                                </div>
                                </div>
                            </div>

                        </div>
                        

                    </main>
                </div >
                <div className='md:block hidden'>
                <Footer />
                </div>
            </div>
        </>
    )
}
