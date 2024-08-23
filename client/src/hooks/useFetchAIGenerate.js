import { useState } from "react";
import { Route } from "react-router-dom";

export function useFetchGenerate() {
    const [generateResponse, setGenerateResponse] = useState("")
    const [loading, setLoading] = useState(false)

    async function fetchOllama(route, type, payload) {

        if (payload.consulta !== "") {
            setLoading(true)
            if (type === true) {
                try {
                    console.log(payload);
                    const ollama = await fetch(`http://localhost:5000/api${route}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(payload),
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
                    setGenerateResponse("Lo sentimos, la IA no está disponible de momento... 😢", error);
                }
            } else {
                try {
                    const ollama = await fetch("http://localhost:5000/api/geminiServe/actividades_seleccion", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({ consulta: context.consulta, courseId: courseId, theme: context.theme }),
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

    return { generateResponse, fetchOllama, loading }
}
