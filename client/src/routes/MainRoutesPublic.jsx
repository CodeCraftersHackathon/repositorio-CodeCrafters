import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/publicPages/Login"
import { Register } from "../pages/publicPages/Register"
import { Index } from "../pages/publicPages/Index"

export const MainRoutesPublic = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}