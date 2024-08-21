import { connect } from "mongoose"
import { URI } from "../config/config.js"

export const dbConnection = async () => {
    try {
        await connect(URI)
        console.log("Base de datos conectada");
    } catch (error) {
        console.log("Error al conectar a la DB", error);
        process.exit()
    }
}

