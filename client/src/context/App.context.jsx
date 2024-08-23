import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducer/authReducer";
import { apiFetchFunction } from "../hooks/fetchApi";
import { useToggle } from "../hooks/useToggle"
import { types } from "../types/types";

// ! Este almacena los datos
export const PageContext = createContext();

// ! Este engloba al resto de componentes
export const PageContextProvider = ({ children }) => {

    // ! AUTH
    const token = localStorage.getItem("token");

    const initialState = {
        logged: token ? true : false,
        token: token || null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (token) {
            dispatch({
                type: types.LOGIN,
                payload: {
                    token,
                },
            });
        }
    }, [token, dispatch]);

    const login = async (values) => {
        try {
            const login = await apiFetchFunction("/login", "POST", values);

            console.log(login);

            if (login.status == 201) {
                localStorage.setItem("token", login.token);
                dispatch({
                    type: types.LOGIN,
                    payload: { token: login.token },
                });
                return { success: true };
            } else {
                return { success: false, message: login.errors };
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        dispatch({
            type: types.LOGOUT,
        });
    };

    // ! THEME
    const { toggle: darkTheme, handleToggle: setDarkTheme } = useToggle();

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    // ! INSTALLED
    const { toggle: isInstallable, handleToggle: setIsInstallable } = useToggle(false);

    const handleInstalation = (newState) => {
        if (newState) {
            setIsInstallable(newState)
        }
        return isInstallable
    }


    return (
        <PageContext.Provider value={{ darkTheme, state, login, logout, toggleTheme, handleInstalation }}>
            {children}
        </PageContext.Provider>
    );
};
