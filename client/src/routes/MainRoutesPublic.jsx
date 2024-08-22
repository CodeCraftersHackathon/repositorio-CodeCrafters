import { Route, Routes } from "react-router-dom"

import { Libreta } from "../pages/publicPages/Libreta"
import { ToDo } from "../pages/publicPages/ToDo"


export const MainRoutesPublic = () => {

    return (
        <>
            <Routes>

                <Route path="/libreta" element={<Libreta />} />
                <Route path="/todo" element={<ToDo />} />

            </Routes>
        </>
    )
}