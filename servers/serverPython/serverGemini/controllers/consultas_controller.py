from config.api_gemini import model
from config.api_gemini import genai
from pydantic import BaseModel
from utils.AIqueries import *

class DatosConsulta(BaseModel):
    consulta: str


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
