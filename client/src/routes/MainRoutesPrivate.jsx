import { Routes, Route } from "react-router-dom"
import { Libreta } from "../pages/authPages/Libreta"


export const MainRoutesPrivate = () => {

    // !agregar la tecnologia en las urls

    return (
        <>
            <Routes>

                <Route path="/libreta" element={<Libreta />} />

            </Routes>
        </>
    )
}