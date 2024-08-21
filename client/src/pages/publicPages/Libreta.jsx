import { useState } from "react";
import { Layout } from "../../components/Layout.component"

export const Libreta = () => {
    const [materias, setMaterias] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);

    const [promedio, setPromedio] = useState(0);

    let calcularPromedio = () => {
        if (materias.length == 0) {
            return;
        } else {
            let suma = 0;
            for (let i = 0; i < materias.length; i++) {
                suma += parseFloat(calificaciones[i]);
            }
            setPromedio((suma / materias.length).toFixed(2));
        }

    }

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-poppins">Mi libreta</h1>
                <div className="flex flex-col justify-center items-center">
                    <div className="py-5">
                        <input
                            type="text"
                            placeholder="Materia"
                            id="materia"
                            className="border-b-2 border-slate-400 p-2"

                        />
                        <input
                            type="number"
                            placeholder="Calificación"
                            id="calificacion"
                            className="border-b-2 border-slate-400 p-2"
                        />

                        <button
                            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setMaterias([...materias, document.getElementById("materia").value]);
                                setCalificaciones([...calificaciones, document.getElementById("calificacion").value]);
                            }}
                        >
                            Agregar
                        </button>
                    </div>

                    <div className="flex flex-row py-5">
                        <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded" onClick={calcularPromedio}>
                            Calcular promedio
                        </button>
                        {promedio != 0 && (
                            <p className="font-poppins py-3 px-4">
                                Tu promedio es {promedio}
                            </p>
                        )}
                    </div>

                    <table className="border w-1/2 ">
                        <tr className="border">
                            <th className="border">Materia</th>
                            <th>Calificación</th>
                        </tr>
                        {materias.map((materia, index) => (
                            <tr key={index}>
                                <td className="border">{materia}</td>
                                <td className="border">{calificaciones[index]}</td>
                            </tr>
                        ))}
                    </table>

                </div>
            </div>
        </Layout>
    );
}