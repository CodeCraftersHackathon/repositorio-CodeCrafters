import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";

 export const Graph = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [streakData, setStreakData] = useState([]);
  const [expByUser, setExpByUser] = useState(true);








  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        const users = res.data;
        const experienceRanges = Array(10).fill(0);
        const streakRanges = Array(10).fill(0);

        users.forEach(user => {
          const expIndex = Math.min(Math.floor(user.exp / 200), 9);
          const rachaIndex = Math.min(Math.floor(user.racha / 100), 9); // Agrupado en rangos de 100 días

          experienceRanges[expIndex] += 1;
          streakRanges[rachaIndex] += 1;
        });

        setExperienceData(experienceRanges.map((count, index) => ({
          range: `${index * 200}-${(index + 1) * 200}`,
          count,
        })));

        setStreakData(streakRanges.map((count, index) => ({
          range: `${index * 100}-${(index + 1) * 100}`, // Agrupado en rangos de 100 días
          count,
        })));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    
    <div className="flex flex-col p-3 h-full">
      {expByUser ? (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setExpByUser(false)}>
      Ver por Racha
    </button>
  ) : (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setExpByUser(true)}>
      Ver por Experiencia
    </button>
  )}
      <div className="flex flex-col p-3 h-full">
  {expByUser ? (
    <>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-black">Rango de Experiencia por Usuarios</h2>
      </div>
      <div className="flex-grow ">
        <BarChart width={600} height={400} data={experienceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </>
  ) : (
    <>
      <div className="text-center mb-1">
        <h2 className="text-2xl font-bold text-black">Rango de Racha por Usuarios</h2>
      </div>
      <div className="flex-grow">
        <BarChart width={600} height={400} data={streakData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </>
  )}

</div>

    </div>
  );
};

export default Graph;
