import { Routes, Route } from "react-router-dom"
import { Libreta } from "../pages/authPages/Libreta"
import { ToDo } from "../pages/authPages/ToDo"
import { MultipleChoice } from "../pages/authPages/MultipleChoice"
import { Resumen } from "../pages/authPages/Resumen"
import { Preguntas } from "../pages/authPages/Preguntas"
import { Perfil } from "../pages/authPages/Perfil"



export const MainRoutesPrivate = () => {

    // !agregar la tecnologia en las urls

    return (
        <>
            <Routes>

                <Route path="/libreta" element={<Libreta />} />
                <Route path="/todo" element={<ToDo />} />
                <Route path="/multiplechoice" element={<MultipleChoice />} />
                <Route path="/resumen" element={<Resumen />} />
                <Route path="/preguntas" element={<Preguntas />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </>
    )
}