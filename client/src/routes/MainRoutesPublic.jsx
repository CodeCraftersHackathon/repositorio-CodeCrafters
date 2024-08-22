import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/publicPages/Login"
import { Register } from "../pages/publicPages/Register"
import { Index } from "../pages/publicPages/Index"

export const MainRoutesPublic = () => {

    return (
        <>
            <Routes>

                <Route path="/libreta" element={<Libreta />} />

            </Routes>
        </>
    )
}