import express from "express"
import cors from "cors"
import morgan from "morgan"
import { PORT } from "./src/config/config.js"
import userRouter from "./src/routes/user.routes.js"
import { dbConnection } from "./src/db/connectionDB.js"
import iaRouter from "./src/routes/ia.routes.js"

class Server {

    constructor() {
        this.app = express();
        this.port = PORT;

        this.dbConnection()

        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
    }

    routes() {
        this.app.use("/api", userRouter);
        this.app.use('/api',iaRouter )
    }

    listen() {
        this.app.listen(this.port, () => console.log("Servidor corriendo en http://localhost:" + this.port))
    }
}

const server = new Server();

server.listen()
