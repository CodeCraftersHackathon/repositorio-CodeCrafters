import { Route, Routes, BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"

import { MainRoutesPrivate } from "./MainRoutesPrivate"
import { MainRoutesPublic } from "./MainRoutesPublic"


export const AppRouter = () => {

    return (

        <BrowserRouter>
            <ToastContainer />
       
            <Routes>
                <Route path="/*" element={
                    <PublicRoutes>
                        < MainRoutesPublic />
                    </PublicRoutes>
                } />

                <Route path="auth/*" element={
                    <PrivateRoutes>
                        <MainRoutesPrivate />
                    </PrivateRoutes>
                } />

            </Routes>
        </BrowserRouter>

    )
}