import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout.component";
import { useRadioForm } from "../../hooks/useRadioForm";
import { apiFetchFunction } from "../../hooks/fetchApi"
import { useForm } from "../../hooks/newForm"
import { ToolTip } from "../../components/ToolTip";
import { FaInfoCircle } from "react-icons/fa";

export const Resumen = () => {

  const formValue = {
    consulta: ""
  }
  const { values, handleSubmit, handleChange } = useForm(formValue)

  const [response, setResponse] = useState("");

  const [laoding, setLoading] = useState(false)


  const context = useMemo(
    () => ({
      consulta: values.consulta,
      theme: "oscuro",
    }),
    [values.consulta],
  );

  useEffect(() => {

    setResponse("")

  }, [context])

  const onSubmit = async () => {
    try {
      if (context.consulta !== "") { // Verifica si consulta tiene un valor no vacío
        setLoading(true);
        setResponse(""); // Limpia la respuesta previa
    
        const response = await fetch("http://localhost:5000/api/generateResumen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ context }),
        });
    
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
    
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;
    
        while (!done) {
          const { value, done: chunkDone } = await reader.read();
          done = chunkDone;
          const chunk = decoder.decode(value, { stream: !done });
    
          console.log(chunk); // Verifica el contenido de cada chunk recibido
    
          // Actualiza el estado con cada chunk recibido
          setResponse(prevResponse => prevResponse + chunk);
        }
    
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  


  return (
    <Layout>
      <div className="space-y-5 w-full">
        <h1 className="text-white font-bold text-xl">¡Resumamos un apunte!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-24">
          <div className="flex space-x-4 items-center">
            <ToolTip bgColor={"bg-blue-400"} borderColor={"border-blue-400"} icon={<FaInfoCircle />} iconColor={"text-blue-500"} text={"Ingresa tus apuntes en forma de texto"} />

            <textarea type="text" placeholder="Ingresa tus apuntes aqui!" className="w-full rounded h-10 p-2" value={values.consulta} onChange={handleChange} name="consulta" id="consulta" />

            <button
              className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:scale-110"
              type="submit"
            >
              ¡Enviar!
            </button>
          </div>
        </form>

        {
          laoding && (
            <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )
        }

        {
          response != "" &&
          <section className="flex flex-col space-y-2">
            <h2
              className={`text-slate-200 text-2xl text-center pl-3  font-bold font-roboto-mono`}
            >
              Material Teorico
            </h2>
            <p className="text-white">
              {response?.texto}
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => navigator.clipboard.writeText(response?.texto)} className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:scale-110"> Copiar en el portapapeles </button>
              <a href={response?.texto} download className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:scale-110" > Descargar resumen </a>
              <a href="/" className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:scale-110"> Volver al inicio </a>
            </div>


          </section>
        }
      </div>
    </Layout >
  );
};