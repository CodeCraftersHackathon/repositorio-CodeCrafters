from config.api_gemini import model
from config.api_gemini import genai
from pydantic import BaseModel
from utils.AIqueries import *

class DatosConsulta(BaseModel):
    consulta: str

def consultas(datos: DatosConsulta):
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
    consulta = datos.consulta

    try:
        response = model.generate_content(consulta)
        return response.text
    except Exception as e:
        return str("Error al realizar la consulta: " + str(e) + "\n")



def consulta_correccion_codigo(codigo: str, lenguaje: str):
    model = genai.GenerativeModel(model_name="gemini-1.0-pro")

    # Define la consulta según el lenguaje especificado
    consulta = f"""Comportate como Mentor, corrigue esto:Lenguaje:{lenguaje} ,
    limitaciones:
    1-contesta si esta mal o esta bien y di porque
    2- no des la respuesta dificultad:sintaxis flexible.
    Codigo: {codigo} ."""
    try:
        response = model.generate_content(consulta)
        return response.text
    except Exception as e:
        return str("Error al realizar la consulta: " + str(e) + "\n")


def generar_actividadesAi(tema: str, theme:str):
    print(tema)
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
    # Define la consulta
    consulta = ai_queries_practices(tema, theme)

    try:
        response = model.generate_content(consulta)
        return response.text
    except Exception as e:
        return str("Error al realizar la consulta: " + str(e) + "\n")

def generar_actividades_seleccion(tema: str, theme: str):
    print(tema)
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")

    consulta = ai_queries_selective(tema)
    try:
        response = model.generate_content(consulta)
        print(response.text)


        # Extraer el texto de la respuesta
        response_text = response.text if hasattr(response, 'text') else str(response)

        parsed_response = parse_response(response_text)
        return parsed_response
    except Exception as e:
        return str("Error al realizar la consulta: " + str(e) + "\n")
