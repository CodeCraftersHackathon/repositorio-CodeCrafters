import { useContext, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { PageContext } from "../context/App.context";

export const PublicRoutes = ({ children }) => {

    const { state } = useContext(PageContext);

    const location = useLocation()

    return (state.logged && (location.pathname === "/login" || location.pathname === "/register"))
        ? (<Navigate to={'/'} />)
        : children
}