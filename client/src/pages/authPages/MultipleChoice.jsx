import { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageContext } from "../../context/App.context";
import { useFetchGenerate } from "../../hooks/useFetchAIGenerate";
import { Layout } from "../../components/layout/Layout.component";
// import { useRadioForm } from "../../hooks/useRadioForm";
import { TiArrowBack } from "react-icons/ti";
import { useToast } from "../../hooks/useToast";
import { apiFetchFunction } from "../../hooks/fetchApi"
import { useForm } from "../../hooks/newForm"

export const MultipleChoice = () => {

  const formValue = {
    consulta: ""
  }

  const { values, handleSubmit, handleChange } = useForm(formValue)

  // const { fetchGenerate, generateResponse, loading } = useFetchGenerate();

  const navigate = useNavigate();

  const context = useMemo(
    () => ({
      tema: "xd",
      theme: "oscuro",
    }),
    ["XD"],
  );

  const onSubmit = () => {

  }

  // const { selectedValues, handleChange } = useRadioForm();

  // const onSubmit = async (e) => {

  //   const responses = {};
  //   const comparisons = []; // Array para almacenar los resultados de las comparaciones

  //   generateResponse?.preguntas?.forEach((pregunta, index) => {
  //     try {
  //       const key = `question-${index}`;
  //       const opciones = generateResponse?.seleccionables?.[`Pregunta ${index + 1}`]?.slice(0, 4) || [];

  //       const correctaRaw = generateResponse?.seleccionables?.[`Pregunta ${index + 1}`]?.[4];
  //       const correcta = correctaRaw ? correctaRaw.split(":")[1].replace(/\*\*/g, "").trim() : null;

  //       const justificacionRaw = generateResponse?.seleccionables?.[`Pregunta ${index + 1}`]?.[5];
  //       const justificacion = justificacionRaw ? justificacionRaw.split(":")[1]?.trim() : "";

  //       const respuestaSeleccionada = selectedValues[key]?.trim() || "";
  //       const esCorrecta = respuestaSeleccionada.trim().toLowerCase() === correcta?.trim().toLowerCase();

  //       formatted[`pregunta ${index + 1}`] = {
  //         pregunta,
  //         opciones,
  //         opcionElegida: respuestaSeleccionada,
  //         correcta,
  //         justificacion,
  //         esCorrecta,
  //       };

  //       responses[`pregunta ${index + 1}`] = {
  //         correcta,
  //         justificacion,
  //       };

  //       // Agregar la comparación al array de comparaciones
  //       comparisons.push({
  //         pregunta,
  //         respuestaSeleccionada,
  //         correcta,
  //         justificacion,
  //         esCorrecta,
  //       });
  //     } catch (error) {
  //       console.error(`Error procesando la pregunta ${index + 1}:`, error);
  //     }
  //   });

  //   setCorrectResponse(responses);

  //   try {
  //     // Realizar fetch al backend enviando el array de comparaciones

  //     const response = await apiFetchFunction("/api/teorical", "PUT", { corrections: comparisons, courseId: courseId });

  //     console.log(response);

  //     useToast(response.status, "Corrección enviada exitosamente.")

  //   } catch (error) {
  //     console.error("Error al enviar la corrección:", error);

  //     useToast(500, "No se pudo enviar la corrección. Inténtelo nuevamente.")
  //   }
  // };

  return (
    <Layout>
      <div className="flex flex-col">

        <section>

          <form onSubmit={handleSubmit(onSubmit)}>


            <div className="flex space-x-4 items-center">
              <input type="text" placeholder="¿Sobre que tema quieres aprender?" className="w-full rounded h-10" value={values.consulta} onChange={handleChange} name="consultas" id="consultas" />

              <button
                className={`border-white rounded-md font-semibold bg-yellow-500 border-2 hover:bg-yellow-700 hover:scale-110 text-white transition-all cursor-pointer h-8 w-20`}
                type="submit"
              >
                ¡Enviar!
              </button>
            </div>
          </form>
        </section>


        {
          false &&
          <section>
            <h1
              className={`text-slate-900 text-2xl text-left pl-3  font-bold font-roboto-mono`}
            >
              Actividades Multiple Choice
            </h1>
          </section>
        }

      </div>
    </Layout >
  );
};