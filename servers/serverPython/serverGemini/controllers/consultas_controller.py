from config.api_gemini import model
from config.api_gemini import genai
from pydantic import BaseModel
from utils.AIqueries import *

class DatosConsulta(BaseModel):
    consulta: str

def post_actividades(data, theme):
    url = "http://locahost:5000/api/saveMCQuestion"  # Reemplaza con el URL de tu API
    headers = {
        "Content-Type": "application/json",
    }
    
    payload = {
        "consulta": data,
        "theme": theme,
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Lanza un error si la petición falla
        return response.json()  # O `response.text` si prefieres el texto crudo
    except requests.exceptions.RequestException as e:
        return f"Error al hacer el POST: {str(e)}"


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
