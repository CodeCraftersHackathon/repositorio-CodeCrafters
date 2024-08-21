import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { PageContext } from "../context/App.context";

export const PrivateRoutes = ({ children }) => {

    const { state } = useContext(PageContext);

    return (state.logged && state.token)
        ? children
        : (<Navigate to={'/login'} />)
}

