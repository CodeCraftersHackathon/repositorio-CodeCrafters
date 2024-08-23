import React from 'react'
import { Layout } from '../../components/layout/Layout.component'
import { Cards } from "../../components/Cards.component"
import { useNavigate } from 'react-router-dom'

export const Index = () => {

    const name = localStorage.getItem("username")
    const navigate = useNavigate()

    return (
        <Layout>
            <div className='flex flex-col space-y-5'>
                {name &&
                    <>
                        <h1 className="text-white font-bold text-xl">¡Bienvenido: {name}!</h1>
                        <h3 className='text-white font-bold text-md'>¿Qué quieres hacer hoy?</h3>
                    </>
                }

                <div className="grid grid-cols-2 grid-rows-2 gap-5">
                    <Cards title={"Actividades de opcion multiple"} content={"Genera actividades multiple choice mediante inteligencia artificial en base a un tema que desees estudiar"} footer={false} nav={()=>navigate("/auth/multiplechoice")} />

                    <Cards content={"Genera preguntas sobre algun tema y mide tus conocimientos con la inteligencia artificial"} title={"Actividades de respuesta libre"} footer={false} nav={()=>navigate("/auth/preguntas")}/>

                    <Cards content={"Sube una imagen o un texto y obten resumenes mediante IA"} title={"Resumir un texto"} footer={false} nav={()=>navigate("/auth/resumen")}/>

                    <Cards content={"Lleva registros de tus calificaciones"} title={"Libreta"} footer={false} nav={()=>navigate("/auth/libreta")}/>
                </div>
            </div>
        </Layout >
    )
}
