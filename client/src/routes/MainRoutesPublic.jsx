import { Route, Routes } from "react-router-dom"

import { Libreta } from "../pages/Libreta"


export const MainRoutesPublic = () => {

    return (
        <>
            <Routes>

                <Route path="/libreta" element={<Libreta />} />

            </Routes>
        </>
    )
}