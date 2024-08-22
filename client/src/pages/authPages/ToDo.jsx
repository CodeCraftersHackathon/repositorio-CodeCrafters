import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout.component";
import { apiFetchFunction } from "../../hooks/fetchApi";
import { useForm } from "../../hooks/newForm"


export const ToDo = () => {

    const formValues = {
        todo: ""
    }

    const { values, handleChange, handleSubmit } = useForm(formValues)

    const [tareas, setTareas] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);

    const isCompleted = (index) => {
        return completedTasks.includes(index);
    };

    const handleToggleCompletion = (index) => {
        if (isCompleted(index)) {
            setCompletedTasks(completedTasks.filter((i) => i !== index));
        } else {
            setCompletedTasks([...completedTasks, index]);
        }
    };

    const handleEditFechas = (index, value) => {
        const nuevasFechas = [...fechas];
        nuevasFechas[index] = value;
        setFechas(nuevasFechas);
    };

    const handleEditTareas = (index, value) => {
        const nuevasTareas = [...tareas];
        nuevasTareas[index] = value;
        setTareas(nuevasTareas);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const onSubmit = async () => {
        const response = await apiFetchFunction("/todos", "POST", values)
        console.log(response);
    }

    console.log(values);

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center px-0 py-5 gap-0 text-white">
                <h1 className="text-3xl font-poppins">Mis tareas</h1>
                <div className="flex flex-col justify-center items-center">
                    <form className="py-3" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            onChange={handleChange}
                            placeholder="tarea por hacer"
                            id="todo"
                            name="todo"
                            className="border-b-2 border-slate-400 p-2 h-10 text-black"
                        />
                        <input
                            type="date"
                            placeholder="fechas"
                            id="fechas"
                            className="border-b-2 border-slate-400 p-2 h-10 text-black"
                        />
                        <button
                            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                        >
                            Agregar
                        </button>
                    </form>



                    <table className="border w-1/2">
                        <thead>
                            <tr className="border">
                                <th className="border">tarea</th>
                                <th className="border">fecha limite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tareas.map((tarea, index) => (
                                <tr key={index} onClick={() => handleToggleCompletion(index)}>
                                    <td className="border"
                                        contentEditable={editMode}
                                        onBlur={(e) => handleEditTareas(index, e.target.textContent)}
                                        style={{ textDecoration: isCompleted(index) ? 'line-through' : 'none' }}
                                    >
                                        {tarea}
                                    </td>
                                    <td
                                        className="border"
                                        contentEditable={editMode}
                                        onBlur={(e) => handleEditFechas(index, e.target.textContent)}
                                        style={{ textDecoration: isCompleted(index) ? 'line-through' : 'none' }}
                                    >
                                        {fechas[index]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {
                            tareas.length != 0 ? <button
                                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mt-5"
                                onClick={toggleEditMode}>
                                {editMode ? "Listo" : "Editar"}
                            </button> : null
                        }

                        {editMode != false || tareas.length != 0 && (
                            <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mt-5 ml-5" onClick={() => { setTareas([]); setFechas([]); setPromedio(0) }}>
                                Limpiar
                            </button>
                        )}

                        {editMode == false && (
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
