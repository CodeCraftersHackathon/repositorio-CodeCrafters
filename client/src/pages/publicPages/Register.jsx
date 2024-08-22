import React from 'react'
import { Layout } from '../../components/Layout.component'
import { useNavigate } from 'react-router-dom'

export const Register = () => {

    const navigate = useNavigate()

    return (
        <Layout>

            <div className='flex flex-col border-2 border-white rounded-md text-white w-full px-10 space-y-5'>
                <h2 className='font-semibold py-5 text-2xl
                '>Registro</h2>

                <div className='flex flex-col space-y-5'>
                    <input
                        placeholder='Nombre de usuario'
                        type="text"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />

                    <input
                        placeholder='Email'
                        type="text"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />

                    <input
                        placeholder='Contraseña'
                        type="text"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />

                    <input
                        placeholder='Confirmar contraseña'
                        type="text"
                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                        required
                    />
                </div>

                <div className='space-y-5'>
                    <p>¿Ya tienes una cuenta? <span onClick={()=>navigate("/login")} className='hover:text-blue-500 cursor-pointer'>Iniciar Sesión</span></p>

                    <button className='p-1 bg-blue-500 rounded-md border-white border-2 hover:bg-blue-800'>Registrarse</button>
                </div>

            </div>

        </Layout>
    )
}
