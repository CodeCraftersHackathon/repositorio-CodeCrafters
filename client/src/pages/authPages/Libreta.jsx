import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout.component";

export const Libreta = () => {
    const [materias, setMaterias] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);
    const [promedio, setPromedio] = useState(0);
    const [editMode, setEditMode] = useState(false);

    const calcularPromedio = () => {
        if (materias.length === 0) {
            return;
        } else {
            let suma = 0;
            for (let i = 0; i < materias.length; i++) {
                suma += parseFloat(calificaciones[i]);
            }
            setPromedio((suma / materias.length).toFixed(2));
        }
    };



    const handleEditCalificacion = (index, value) => {
        const nuevasCalificaciones = [...calificaciones];
        nuevasCalificaciones[index] = value;
        setCalificaciones(nuevasCalificaciones);
    };


    const handleEditMateria = (index, value) => {
        const nuevasMaterias = [...materias];
        nuevasMaterias[index] = value;
        setMaterias(nuevasMaterias);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center px-0 py-5 gap-0">
                <h1 className="text-3xl font-poppins">Mi libreta</h1>
                <div className="flex flex-col justify-center items-center">
                    <div className="py-3">
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
                    {(materias.length !== 0 && editMode === false) && (
                        <div className="flex flex-row py-5">
                            <button
                                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded"
                                onClick={calcularPromedio}
                            >
                                Calcular promedio
                            </button>
                            {promedio !== 0 && (
                                <p className="font-poppins py-3 px-4">
                                    Tu promedio es {promedio}
                                </p>
                            )}
                        </div>
                    )}
                    <table className="border w-1/2">
                        <thead>
                            <tr className="border">
                                <th className="border">Materia</th>
                                <th className="border">Calificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materias.map((materia, index) => (
                                <tr key={index}>
                                    <td className="border"
                                        contentEditable={editMode}
                                        onBlur={(e) => handleEditMateria(index, e.target.textContent)}
                                         >
                                            {materia}
                                    </td>
                                    <td
                                        className="border"
                                        contentEditable={editMode}
                                        onBlur={(e) => handleEditCalificacion(index, e.target.textContent)}
                                        
                                    >
                                        {calificaciones[index]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {
                            materias.length != 0 ? <button
                            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mt-5"
                            onClick={toggleEditMode}>
                            {editMode ? "Listo" : "Editar"}
                            </button> : null
                        }
                
                        {editMode != false || materias.length != 0 && (
                            <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mt-5 ml-5" onClick={() => {setMaterias([]) ; setCalificaciones([]); setPromedio(0)}}>
                            Limpiar
                        </button>
                        )}

                        {editMode == false  && (
                        <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mt-5 ml-5" type="submit">
                        Guardar
                        </button>
                    )}
                    </div>
                    
                </div>
            </div>
        </Layout>
    );
};
