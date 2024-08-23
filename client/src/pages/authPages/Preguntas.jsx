import { useState, useEffect } from "react";
import { useForm } from "../../hooks/newForm";
import { ToolTip } from "../../components/ToolTip";
import { FaInfoCircle } from "react-icons/fa";
// import { useFetchAI } from "../hooks/useFetchAI";
// import { useFetchGenerate } from "../hooks/useFetchAIGenerate";
// import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout.component";

export const Preguntas = () => {


    const formValues = {
        consulta: ""
    }

    const { values, handleChange, handleSubmit } = useForm(formValues)

    const onSubmit = () => {

    }


    const [loading, setLoading] = useState(false)


    // const { fetchAI, iaResponse, setIaResponse } = useFetchAI();
    // const { fetchGenerate, generateResponse } = useFetchGenerate()

    // const { toggle: loadingGenerate, handleToggle: stopLoading } = useToggle()

    // const context = useMemo(() => ({
    //   tema: "variables en javascrit"
    // }), []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             await fetchGenerate(context, true, courseId);
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             stopLoading();
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <Layout>
            <div className="flex flex-col w-full">

                <h1 className={`text-neutral-200 text-2xl text-center py-4 font-bold font-roboto-mono`}>Preguntas de respuesta Libre</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full px-24">
                    <div className="flex space-x-4 items-center">
                        <ToolTip bgColor={"bg-blue-400"} borderColor={"border-blue-400"} icon={<FaInfoCircle />} iconColor={"text-blue-500"} text={"Solo debes introducir el tema del cual te interese aprender"} />

                        <input type="text" placeholder="¿Sobre que tema quieres aprender?" className="w-full rounded h-10 p-2" value={values.consulta} onChange={handleChange} name="consulta" id="consulta" />

                        <button
                            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:scale-110"
                            type="submit"
                        >
                            ¡Enviar!
                        </button>
                    </div>
                </form>


                <section className={`grid grid-cols-2 grid-rows-1 py-3 border-2 border-white text-white`}>

                    <div className="">


                    </div>


                    <div className="">

                    </div>


                </section>
            </div>
        </Layout>
    );
};
