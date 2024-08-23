import { useState } from "react";

export function useFetchGenerate() {
    const [generateResponse, setGenerateResponse] = useState("")
    const [loading, setLoading] = useState(false)

    async function fetchGenerate(context, type, courseId) {

        if (context !== "" || context !== null) {
            setLoading(true)
            if (type === true) {
                try {
                    console.log(context);
                    const ollama = await fetch("http://localhost:5000/api/actividades_seleccion", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({ context: context, courseId: courseId }),
                    });

                    if (!ollama.ok) {
                        throw new Error("Fetch failed");
                    }

                    const reader = ollama.body.getReader();
                    const decoder = new TextDecoder();
                    let chunk = await reader.read();

                    while (!chunk.done) {
                        const text = decoder.decode(chunk.value, { stream: true });
                        setGenerateResponse((texto) => texto += text);
                        chunk = await reader.read();
                    }

                } catch (error) {
                    setGenerateResponse("Lo sentimos, la IA no está disponible de momento... 😢");
                }
            } else {
                try {
                    const ollama = await fetch("http://localhost:5000/api/geminiServe/actividades_seleccion", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({consulta: context.consulta, courseId: courseId, theme: context.theme}),
                    });

                    if (!ollama.ok) {
                        throw new Error("Fetch failed");
                    }

                    const response = await ollama.json()
                    setGenerateResponse(response);

                } catch (error) {
                    setGenerateResponse("Lo sentimos, la IA no está disponible de momento... 😢");
                }
            }
            setLoading(false)
        }
    }

    return { generateResponse, fetchGenerate, loading }
}
