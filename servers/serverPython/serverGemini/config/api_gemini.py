import clave


import google.generativeai as genai

genai.configure(api_key=clave.clave)

model = genai.GenerativeModel(model_name="gemini-pro")
