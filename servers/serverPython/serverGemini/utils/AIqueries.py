def ai_queries_practices(tema, theme):
    return f"""
    Actúa como un Mentor experto y genera una actividad práctica sobre el tema: {tema}. La actividad debe cumplir con las siguientes especificaciones:

    1. **Descripción**: Proporciona un enunciado claro y conciso que describa el problema a resolver. Asegúrate de que esté relacionado con {theme}.
    2. **Dificultad**: Ajusta la dificultad de la actividad según la complejidad del tema y el nivel de conocimientos esperado.
    3. **Pista**: Ofrece una pista relevante que ayude al estudiante a entender cómo abordar el problema, sin proporcionar la solución completa.
    4. **Motivación**: Anima al estudiante a resolver el problema y resalta la importancia de adquirir esta habilidad.

    Sigue este formato:

    # Actividad: Resolución de Problemas en {theme}

    ## Descripción
    En esta actividad, se te presenta un desafío relacionado con {tema}. Debes desarrollar un algoritmo o un fragmento de código para resolver el problema descrito a continuación.

    ## Especificaciones
    - Describe el problema detalladamente, incluyendo ejemplos si es necesario.
    - Lista las restricciones y requerimientos que debe cumplir la solución.
    - Aclara que la solución no debe ser una función específica, sino un enfoque general o un algoritmo.

    ## Pista
    Ofrece una pista que puede incluir técnicas, algoritmos o conceptos clave relevantes para la solución del problema.

    ## Motivación
    ¡Puedes hacerlo! Resolver este problema te ayudará a mejorar tus habilidades en {theme}. Tómate el tiempo necesario para comprender el problema y explorar diferentes enfoques. Cada intento te acerca más a la solución.

    """


def ai_queries_selective(theme):
    return f"""
    Hola, necesito que me respondas en un formato específico para poder armar una función que extraiga los elementos del string y los convierta en un objeto. Es importante que sigas **exactamente** la estructura que se describe a continuación, y que los 'Seleccionables' no contengan '**' en ninguna parte.

    ## Explicación:
    Proporciona una explicación detallada sobre el tema "{theme} Javascript". La explicación debe comenzar justo después de '## Explicación:' y debe estar relacionada con "{theme}". No incluyas ningún otro contenido fuera de la explicación en esta sección.

    ## Preguntas:
    1. Escribe una pregunta sobre "{theme}" aquí.
    2. Escribe una segunda pregunta sobre "{theme}" aquí.
    3. Escribe una tercera pregunta sobre "{theme}" aquí.
    4. Escribe una cuarta pregunta sobre "{theme}" aquí.

    ## Seleccionables:
    Para cada pregunta, proporciona exactamente 4 opciones, la opción correcta y una justificación para la opción correcta. Asegúrate de que el formato sea idéntico al siguiente:

    **Seleccionables para Pregunta 1:**
    - Opción 1: Texto de la opción 1 para Pregunta 1.
    - Opción 2: Texto de la opción 2 para Pregunta 1.
    - Opción 3: Texto de la opción 3 para Pregunta 1.
    - Opción 4: Texto de la opción 4 para Pregunta 1.
    - Correcta: Texto de la opción correcta para Pregunta 1.
    - Justificación: Explicación para la opción correcta de Pregunta 1.

    **Seleccionables para Pregunta 2:**
    - Opción 1: Texto de la opción 1 para Pregunta 2.
    - Opción 2: Texto de la opción 2 para Pregunta 2.
    - Opción 3: Texto de la opción 3 para Pregunta 2.
    - Opción 4: Texto de la opción 4 para Pregunta 2.
    - Correcta: Texto de la opción correcta para Pregunta 2.
    - Justificación: Explicación para la opción correcta de Pregunta 2.

    **Seleccionables para Pregunta 3:**
    - Opción 1: Texto de la opción 1 para Pregunta 3.
    - Opción 2: Texto de la opción 2 para Pregunta 3.
    - Opción 3: Texto de la opción 3 para Pregunta 3.
    - Opción 4: Texto de la opción 4 para Pregunta 3.
    - Correcta: Texto de la opción correcta para Pregunta 3.
    - Justificación: Explicación para la opción correcta de Pregunta 3.

    **Seleccionables para Pregunta 4:**
    - Opción 1: Texto de la opción 1 para Pregunta 4.
    - Opción 2: Texto de la opción 2 para Pregunta 4.
    - Opción 3: Texto de la opción 3 para Pregunta 4.
    - Opción 4: Texto de la opción 4 para Pregunta 4.
    - Correcta: Texto de la opción correcta para Pregunta 4.
    - Justificación: Explicación para la opción correcta de Pregunta 4.

    Asegúrate de que cada sección esté claramente etiquetada y separada para facilitar la extracción automática de datos. Gracias.
    """


import re

def parse_response(response_text):
    result = {
        'explicacion': '',
        'preguntas': [],
        'seleccionables': {}
    }

    # Dividir el texto por secciones principales
    sections = re.split(r'##\s*(Explicación|Explicación del tema|Preguntas|Seleccionables):\s*', response_text)

    if len(sections) < 3:
        print("Error: Formato de respuesta inválido o incompleto.")
        return result

    for i in range(1, len(sections), 2):
        section_name = sections[i].strip()
        section_content = sections[i + 1].strip()

        if section_name in ['Explicación', 'Explicación del tema']:
            result['explicacion'] = section_content

        elif section_name == 'Preguntas':
            preguntas = re.findall(r'\d+\.\s*(.*?)\n*(?=\d+\.|\*\*Seleccionables|$)', section_content, re.DOTALL)
            result['preguntas'] = [pregunta.strip() for pregunta in preguntas if pregunta.strip()]

        elif section_name == 'Seleccionables':
            seleccionables_groups = re.findall(
                r'\*\*Seleccionables para Pregunta (\d+):\*\*\s*(.*?)\n*(?=\*\*Seleccionables para Pregunta|\*\*Preguntas|$)',
                section_content,
                re.DOTALL
            )
            for idx, options in seleccionables_groups:
                option_lines = [line.strip('- ').strip() for line in options.split('\n') if line.strip()]
                if len(option_lines) >= 5:  # Asegura que haya al menos 4 opciones y 1 respuesta correcta
                    result['seleccionables'][f'Pregunta {idx}'] = option_lines

    # Verificar que todas las secciones necesarias estén presentes
    if not result['explicacion']:
        print("Advertencia: La sección de explicación está vacía.")
    if not result['preguntas']:
        print("Advertencia: La sección de preguntas está vacía o mal formateada.")
    if not result['seleccionables'] or len(result['seleccionables']) != len(result['preguntas']):
        print("Advertencia: La sección de seleccionables está vacía o mal formateada.")

    print(result)
    return result


"""
    Crea contenido educativo sobre {theme} con estas especificaciones:
    1. Explicación detallada sobre {theme}.
    2. Actividad de selección relacionada con {theme} (lista de opciones con radios).
    3. Estilos CSS atractivos, similares a ONE DARK o LIGHT de Atom IDE, para escritorio.
    4. Opciones de selección con efectos visuales al ser seleccionadas, usando la fuente 'Consolas'.
    5. Formulario que envíe la respuesta a http://localhost:3001/api/respuestaActivitySelective en JSON: {{ 'actividad': [actividad], 'respuesta': [opción seleccionada] }}.
    6. Al enviar, muestra una alerta con el mensaje "Evaluando la respuesta".
    Genera el contenido en formato HTML y CSS.
"""
