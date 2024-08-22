import React from 'react'
import { Layout } from '../../components/layout/Layout.component'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from "../../hooks/newForm";
import { PageContext } from '../../context/App.context';
import { useContext } from 'react';
import { useToast } from '../../hooks/useToast';
import { apiFetchFunction } from '../../hooks/fetchApi';

export const Register = () => {

    const formValues = {
        userName: "",
        email: "",
        validatePassword: "",
        password: ""
    }

    const { darkTheme } = useContext(PageContext)

    const { values, handleSubmit, handleChange } = useForm(formValues)

    const navigate = useNavigate()

    const onSubmit = async () => {
        if (values?.password !== values?.validatePassword) {
            useToast(400, "Error al registrar usuario")
        } else {
            const response = await apiFetchFunction("/user", "POST", values)

            if (response.errors) {

                console.log(response);
                useToast(400, "Error al registrar usuario")

            } else {
                console.log(response);
                useToast(200, "Usuario registrado correctamente")
                navigate("/login")
            }

        }
    };

    return (
        <Layout>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col border-2 border-white rounded-md text-white w-full px-10 space-y-5'>
                <h2 className='font-semibold py-5 text-2xl
                '>Registro</h2>

                <div className='flex flex-col space-y-5'>
                    <input
                        id='userName'
                        name='userName'
                        value={values?.userName}
                        onChange={handleChange}
                        placeholder='Nombre de usuario'
                        type="text"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />

                    <input
                        id='email'
                        name='email'
                        onChange={handleChange}
                        value={values?.email}
                        placeholder='Email'
                        type="text"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />

                    <input
                        id='password'
                        name='password'
                        onChange={handleChange}
                        value={values?.password}
                        placeholder='Contraseña'
                        type="password"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />

                    <input
                        id='validatePassword'
                        name='validatePassword'
                        onChange={handleChange}
                        value={values?.validatePassword}
                        placeholder='Confirmar contraseña'
                        type="password"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />
                </div>

                <div className='space-y-5 pb-5 flex flex-col justify-center items-center'>
                    <p>¿Ya tienes una cuenta? <span onClick={() => navigate("/login")} className='hover:text-blue-500 cursor-pointer'>Iniciar Sesión</span></p>

                    <button type='submit' className='p-1 bg-blue-500 rounded-md border-white border-2 hover:bg-blue-800'>Registrarse</button>

                    <GoogleLogin />
                </div>

            </form>

        </Layout>
    )
}
