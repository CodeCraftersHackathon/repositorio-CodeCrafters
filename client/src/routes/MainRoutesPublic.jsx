import { Route, Routes } from "react-router-dom"

import { Libreta } from "../pages/publicPages/Libreta"
import { Login } from "../pages/publicPages/Login"
import { Register } from "../pages/publicPages/Register"

export const MainRoutesPublic = () => {

    return (
        <>
            <Routes>

                <Route path="/libreta" element={<Libreta />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />

            </Routes>
        </>
    )
}