# Plataforma de Educación Impulsada por IA

## Descripción

Nuestra plataforma de educación utiliza la inteligencia artificial, específicamente **Llama 3.1** y **Gemini AI**, para ayudar a los estudiantes a concentrarse en sus estudios de manera más efectiva. La plataforma aborda el problema de la falta de concentración y organización en los estudiantes, proporcionando herramientas adaptativas y personalizadas que se ajustan a sus necesidades y tiempos de estudio.

## Características

- **Generación de Actividades y Exámenes Adaptativos:** Utilizando IA, la plataforma genera actividades y modelos de exámenes que se adaptan al ritmo de aprendizaje de cada estudiante, permitiéndoles estudiar de manera más eficiente y a su propio ritmo.

- **Checklist To-Do para Tareas:** Organiza tus tareas con una lista de verificación donde puedes gestionar y priorizar tus entregas. La plataforma te recordará las fechas límite y te ayudará a mantener un seguimiento constante de tus tareas.

- **Libreta de Calificaciones Inteligente:** La plataforma cuenta con una libreta de calificaciones que no solo registra tus notas, sino que también es utilizada por la IA para ajustar la dificultad de las actividades futuras, asegurando que estás siempre en el nivel adecuado de desafío.

## Beneficios

- **Personalización:** La IA adapta las actividades y exámenes a tus necesidades específicas, optimizando tu tiempo de estudio.
  
- **Organización:** Mantén tus tareas organizadas y nunca pierdas de vista una fecha de entrega importante con nuestra checklist to-do.

- **Progreso Constante:** La IA monitorea tu rendimiento y ajusta las actividades para asegurar un progreso constante y significativo.

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   https://github.com/CodeCraftersHackathon/repositorio-CodeCrafters.git
   ```
2. Ingresa a la carpeta del proyecto.
   
4. Instala las dependencias con
   ```bash
   npm install
   ```
5. ingresa a la carpeta del servidor de python para Gemini

6. Crea un servidor virtual con python
   ```bash
   python3 -m venv env
   ```
7. Monta el servidor virtual
    ```bash
    source env/bin/activate

8. Instala las dependencias
   ```bash
   pip install -r requirements.txt
   ```
9. Inicia el servidor de python
    ```bash
    uvicorn main:app --reload
    ```
10. Ingresa a la carpeta del cliente "client"
11. Instala las dependencias
    ```bash
    npm install
    ```
12. Inicia el servidor del cliente
    ```bash
    npm run dev
    ```
13. Iniciar el servidor del servidor "servers"
    ```bash
    npm run dev
    ```
