import { Routes, Route } from "react-router-dom"
import { Libreta } from "../pages/authPages/Libreta"
import { ToDo } from "../pages/authPages/ToDo"


export const MainRoutesPrivate = () => {

    // !agregar la tecnologia en las urls

    return (
        <>
            <Routes>

                <Route path="/libreta" element={<Libreta />} />
                <Route path="/todo" element={<ToDo />} />

            </Routes>
        </>
    )
}