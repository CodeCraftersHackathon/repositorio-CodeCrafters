import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Layout } from "../../components/layout/Layout.component"
import { Graph } from '../../components/Graph.component';






export const Perfil = () => {

  const [users, setUsers] = useState([]);
  const [primerosDiez, setPrimerosDiez] = useState(true);

  const handlePrimerosDiez = () => {
    setPrimerosDiez(!primerosDiez);
  }

  useEffect(() => {
    // Función para obtener los datos de los usuarios
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const maxExpUser = users.reduce((max, user) => {
    if (user.exp > max.exp) {
      return { userName: user.userName, exp: user.exp };
    }
    return max;
  }, { exp: 0, userName: '' });
  
  const maxRachaUser = users.reduce((max, user) => {
    if (user.racha > max.racha) {
      return { userName: user.userName, racha: user.racha };
    }
    return max;
  }, { racha: 0, userName: '' });
  





  return (
<Layout>
  <div>
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Dashboard Experiencia conseguida hoy</h1>
    </div>
    <div className="flex flex-col md:flex-row p-4 rounded-lg text-gray-800 space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-1 bg-gray-50 p-4 rounded-lg text-gray-800">
        <h2 className="text-xl font-bold mb-2">Tabla de Experiencia</h2>
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Nombre</th>
                <th className="px-4 py-2 border">Experiencia</th>
                <th className="px-4 py-2 border">Racha</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, primerosDiez ? 10 : users.length).map(user => (
                user.role !== "ADMIN" && (
                  <tr key={user.id}>
                    <td className="px-4 py-2 border">{user.userName}</td>
                    <td className="px-4 py-2 border">{user.exp}</td>
                    <td className="px-4 py-2 border">{user.racha}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handlePrimerosDiez}>
          {primerosDiez ? 'Ver todos' : 'Ver menos'}
        </button>
      </div>
      <div className="flex-1 bg-gray-50 p-4 rounded-lg text-gray-800">
        <h2 className="text-xl font-bold mb-2">Usuario Destacado</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Usuario destacado</th>
              <th className="px-4 py-2 border">Logro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">Usuario con mayor experiencia: {maxExpUser.userName}</td>
              <td className="px-4 py-2 border">Experiencia lograda hoy: {maxExpUser.exp}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Usuario con mayor racha: {maxRachaUser.userName}</td>
              <td className="px-4 py-2 border">Días con racha: {maxRachaUser.racha}</td>
            </tr>
          </tbody>
        </table>
        <Graph></Graph>
      </div>
    </div>
  </div>
</Layout>


  );
};

