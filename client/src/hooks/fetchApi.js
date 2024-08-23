const apiRoute = "http://localhost:5000/api"

export const apiFetchFunction = async (route, method, payload, py = false) => {

    const url = !py ? `${apiRoute}${route}` : route

    const headers = {
        "Content-Type": "application/json",
    };

    if (url.includes("/auth/") || url.includes("/api/")) {
        headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    }

    //! SIN ARCHIVOS
    if (method !== "GET") {
        try {

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición", error);
        }

    } else if (method === "GET") {
        try {
            const response = await fetch(url, {
                method: method,
                headers: headers,
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición");
        }
    }
}
