import clave


import google.generativeai as genai

genai.configure(api_key=clave.clave)
model = genai.GenerativeModel(model_name="gemini-pro")

consulta = "Podrias decirme como hacer un hola mundo en javascript?"
response = model.generate_content(consulta)
print(response.text)

