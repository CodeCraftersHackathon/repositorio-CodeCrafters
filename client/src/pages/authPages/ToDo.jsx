import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout.component";
import { apiFetchFunction } from "../../hooks/fetchApi";
import { useForm } from "../../hooks/newForm"
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export const ToDo = () => {

    const [todo, setTodo] = useState([])
    const [reload, setReload] = useState(false)

    const formValues = {
        todo: "",
        limitDate: "-"
    }

    const { values, handleChange, handleSubmit } = useForm(formValues)

    useEffect(() => {
        const fetchData = async () => {
            const todoData = await apiFetchFunction("/todos", "GET");
            setTodo(todoData);
            console.log(todoData);
        };
        fetchData(); // Invoca la función asíncrona
    }, [reload]);

    const onSubmit = async () => {
        try {
            if (values.todo !== "") {
                await apiFetchFunction("/todos", "POST", values)
                setReload(!reload)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onDelete = async (id) => {

        await apiFetchFunction("/todos", "DELETE", { id })
        setReload(!reload)
    }

    const onUpdate = async (id) => {

        await apiFetchFunction("/todos", "DELETE", { id })
        setReload(!reload)
    }

    console.log(values);

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center text-white">
                <h1 className="text-3xl font-poppins">Mis tareas</h1>
                <div className="flex flex-col justify-center items-center">

                    <form className="py-3 space-x-4" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            onChange={handleChange}
                            placeholder="tarea por hacer"
                            id="todo"
                            name="todo"
                            required
                            className="border-b-2 border-slate-400 p-2 h-10 text-black rounded-md"
                        />
                        <input
                            type="date"
                            name="limitDate"
                            id="limitDate"
                            value={values.limitDate}
                            onChange={handleChange}
                            className="border-b-2 border-slate-400 p-2 h-10 text-black rounded-md"
                        />
                        <button
                            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:scale-110"
                        >
                            Agregar
                        </button>
                    </form>

                    <table className="border w-1/2">
                        <thead>
                            <tr className="border">
                                <th className="border">Tarea</th>
                                <th className="border">Fecha Limite</th>
                                <th className="border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todo.length > 0 &&
                                todo?.map((tarea, index) => (
                                    <tr key={index} >
                                        <td className="border"
                                        >
                                            {tarea?.todo}
                                        </td>
                                        <td
                                            className="border"
                                        >
                                            {tarea?.limitDate}
                                        </td>

                                        <td className="flex items-center justify-center space-x-4 p-2 border">
                                            <button className="p-2 border-2 bg-red-500 cursor-pointer hover:bg-red-800" onClick={() => onDelete(tarea?._id)}>
                                                <MdDeleteForever />
                                            </button>

                                            {/*        <button className="p-2 border-2 bg-yellow-400 cursor-pointer hover:bg-yellow-800">
                                                <FaEdit />
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </Layout>
    );
};
