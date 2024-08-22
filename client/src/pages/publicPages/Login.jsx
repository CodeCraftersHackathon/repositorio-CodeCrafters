import React from 'react'
import { Layout } from '../../components/Layout.component'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from "../../hooks/newForm"
import { PageContext } from '../../context/App.context';
import { useContext } from 'react';
import { useToast } from '../../hooks/useToast';

export const Login = () => {

    const navigate = useNavigate()

    const formValues = {
        user: "",
        password: ""
    }

    const { darkTheme, login } = useContext(PageContext)

    const { values, handleSubmit, handleChange } = useForm(formValues)

    const onSubmit = async () => {
        const loged = await login(values);
        if (loged.success === true) {
            useToast(200, "¡Login exitoso!");
            localStorage.setItem("username", values.user);
        } else {
            useToast(400, "¡Error de Login!");
        }
    };

    return (
        <Layout>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col border-2 border-white rounded-md text-white h-fit py-5 w-full px-10 space-y-5'>
                <h2 className='font-semibold py-5 text-2xl
                '>Iniciar Sesión</h2>

                <div className='flex flex-col space-y-5'>
                    <input
                        value={values?.user}
                        onChange={handleChange}
                        name='user'
                        id='user'
                        placeholder='Nombre de usuario o Email'
                        type="text"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />

                    <input
                        id='password'
                        name='password'
                        value={values?.password}
                        onChange={handleChange}
                        placeholder='Contraseña'
                        type="password"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />

                </div>

                <div className='space-y-5 flex flex-col justify-center items-center'>
                    <p>¿Aun no tienes una cuenta? <span onClick={() => navigate("/registro")} className='hover:text-blue-500 cursor-pointer'>Registrarse</span></p>

                    <button type='submit' className='p-1 bg-blue-500 rounded-md border-white border-2 hover:bg-blue-800'>Iniciar Sesión</button>

                    <GoogleLogin />
                </div>

            </form>

        </Layout>
    )
}
