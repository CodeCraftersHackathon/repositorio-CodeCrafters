import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout.component";
import { useRadioForm } from "../../hooks/useRadioForm";
import { apiFetchFunction } from "../../hooks/fetchApi"
import { useForm } from "../../hooks/newForm"
import { ToolTip } from "../../components/ToolTip";
import { FaInfoCircle } from "react-icons/fa";

export const MultipleChoice = () => {

  const formValue = {
    consulta: ""
  }
  const { values, handleSubmit, handleChange } = useForm(formValue)

  const [correctResponse, setCorrectResponse] = useState(null);

  const [disabled, setDisabled] = useState(false)

  const [response, setResponse] = useState("");

  const [laoding, setLoading] = useState(false)

  const { selectedValues, handleSelect } = useRadioForm();

  const context = useMemo(
    () => ({
      consulta: values.consulta,
      theme: "oscuro",
    }),
    [values.consulta],
  );

  const onSubmit = async () => {
    try {
      if (context !== "") {
        setLoading(true)
        const response = await apiFetchFunction("http://localhost:8000/actividades_seleccion", "POST", context, true)
        setResponse(response)
        console.log(response);
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const testQuestions = () => {
    const formatted = {}
    const responses = {};
    const comparisons = [];  /* Array para almacenar los resultados de las comparaciones */

    response?.preguntas?.forEach((pregunta, index) => {
      try {
        const key = `question-${index}`;
        const opciones = response?.seleccionables?.[`Pregunta ${index + 1}`]?.slice(0, 4) || [];

        const correctaRaw = response?.seleccionables?.[`Pregunta ${index + 1}`]?.[4];
        const correcta = correctaRaw ? correctaRaw.split(":")[1].replace(/\*\*/g, "").trim() : null;

        const justificacionRaw = response?.seleccionables?.[`Pregunta ${index + 1}`]?.[5];
        const justificacion = justificacionRaw ? justificacionRaw.split(":")[1]?.trim() : "";

        const respuestaSeleccionada = selectedValues[key]?.trim() || "";
        const esCorrecta = respuestaSeleccionada.trim().toLowerCase() === correcta?.trim().toLowerCase();

        formatted[`pregunta ${index + 1}`] = {
          pregunta,
          opciones,
          opcionElegida: respuestaSeleccionada,
          correcta,
          justificacion,
          esCorrecta,
        };

        responses[`pregunta ${index + 1}`] = {
          correcta,
          justificacion,
        };

        // Agregar la comparación al array de comparaciones
        comparisons.push({
          pregunta,
          respuestaSeleccionada,
          correcta,
          justificacion,
          esCorrecta,
        });
      } catch (error) {
        console.error(`Error procesando la pregunta ${index + 1}:`, error);
      }
    });

    setCorrectResponse(responses);
    setDisabled(true)
  };

  return (
    <Layout>
      <div className="space-y-5 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-24">
          <div className="flex space-x-4 items-center">
            <ToolTip bgColor={"bg-blue-400"} borderColor={"border-blue-400"} icon={<FaInfoCircle />} iconColor={"text-blue-500"} text={"Solo debes introducir el tema del cual te interese aprender"} />

            <input type="text" placeholder="¿Sobre que tema quieres aprender?" className="w-full rounded h-10 p-2" value={values.consulta} onChange={handleChange} name="consulta" id="consulta" />

            <button
              className={`border-white rounded-md font-semibold bg-yellow-500 border-2 hover:bg-yellow-700 hover:scale-110 text-white transition-all cursor-pointer h-8 w-20`}
              type="submit" 
            >
              ¡Enviar!
            </button>
          </div>
        </form>

        {
          laoding && (
            <p>
              CARGANDO...
            </p>
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
              {response?.explicacion}
            </p>

            <h2
              className={`text-slate-200 text-2xl text-center pl-3  font-bold font-roboto-mono`}
            >
              Cuestionario
            </h2>


            <div className="flex flex-col px-3 text-left gap-y-8 text-xl">
              {response?.preguntas?.map((pregunta, index) => (
                <div key={pregunta}>
                  <p
                    className={`pb-3 text-white`}
                  >
                    {index + 1 + " " + pregunta}
                  </p>

                  <ul>
                    {response.seleccionables?.[`Pregunta ${index + 1}`]
                      ?.slice(0, 4)
                      ?.map((opcion) => {
                        const opcionTexto = opcion?.split(":")[1]?.trim();
                        const esCorrecta =
                          correctResponse?.[`pregunta ${index + 1}`]?.correcta === opcionTexto;
                        return (
                          <li
                            key={opcion}
                            className={`${correctResponse ? (esCorrecta ? "text-green-500" : "text-red-500") : "text-white"} pl-10 pb-5`}
                          >
                            <label className="flex gap-x-2 items-baseline">
                              <input
                                className="h-4 w-4"
                                type="radio"
                                name={`question-${index}`}
                                value={opcionTexto}
                                checked={selectedValues[`question-${index}`] === opcionTexto}
                                onChange={(e) =>
                                  handleSelect(`question-${index}`, e.target.value)
                                }
                              />
                              {opcionTexto}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                  {correctResponse && (
                    <p className="text-sm text-blue-400">
                      {correctResponse[`pregunta ${index + 1}`]?.justificacion}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex justify-center">
                <button disabled={disabled} className={`border-white rounded-md font-semibold bg-yellow-500 border-2 hover:bg-yellow-700 hover:scale-110 text-white transition-all cursor-pointer h-8 w-20`} onClick={testQuestions}>Corregir</button>
              </div>
            </div>

          </section>
        }
      </div>
    </Layout >
  );
};