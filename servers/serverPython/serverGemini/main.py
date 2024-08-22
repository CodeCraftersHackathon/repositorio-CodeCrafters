from fastapi import FastAPI
from pydantic import BaseModel
from controllers.consultas_controller import consultas
from controllers.consultas_controller import consulta_correccion_codigo
from controllers.consultas_controller import generar_actividadesAi
from controllers.consultas_controller import generar_actividades_seleccion
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json

app = FastAPI()

# Configurar el middleware CORS para permitir solicitudes desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
class DatosConsulta(BaseModel):
    consulta: str
    theme: str

class DatosCorreccion(BaseModel):
    codigo: str
    lenguaje: str

@app.post("/consultas/")
async def procesar_consulta(datos: DatosConsulta):
    print("datos: ", datos)
    return consultas(datos)
@app.post("/correccion_codigo/")
async def corregir_codigo(datos: DatosCorreccion):
    print("corrección: ", datos.codigo)
    print("Lenguaje: ", datos.lenguaje)
    return consulta_correccion_codigo(datos.codigo, datos.lenguaje)

@app.post("/actividades/")
async def generar_actividades(data: DatosConsulta):
    print("tema:", data.consulta)
    return generar_actividadesAi(data.consulta, data.theme)

@app.post("/actividades_seleccion/")
async def generar_actividades(data: DatosConsulta):
    print("tema:", data.consulta)
    return generar_actividades_seleccion(data.consulta, data.theme)


if __name__ == "__main__":
    # Aquí se especifica la dirección IP y el puerto en el que el servidor escuchará
    uvicorn.run(app, host="0.0.0.0", port=8000)
