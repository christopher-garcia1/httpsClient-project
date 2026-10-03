import express from "express"
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponse } from "./api/logResponses.js";
import { middlewareMetricsInc } from "./api/metricsInc.js";
import { handlerMetrics } from "./api/metrics.js";
import { errorHandler } from "./api/middleware.js";
import { config } from "./config.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { createUserHandler } from "./api/createUserHandler.js";
import { deleteUsersHandler } from "./api/deleteUserHandler.js";
import { createChirpHandler } from "./api/createChirpHandler.js";
import { getChirpHandler } from "./api/getChirpHandler.js";
import { getChirpsHandler } from "./api/getChirpsHandler.js";
import { refreshHandler } from "./api/refreshHandler.js";
import { login } from "./api/loginHandler.js";
import { revokeHandler } from "./api/revokeHandler.js";




const app = express();
const PORT = config.api.port

const migrationClient = postgres(config.db.url, { max: 1 })
await migrate(drizzle(migrationClient), config.db.migrationConfig)

app.use(express.json())
app.use(middlewareLogResponse)
app.use("/app", middlewareMetricsInc ,express.static("./src/app"));
app.get("/admin/metrics", handlerMetrics)
app.get("/api/chirps", getChirpsHandler)
app.get("/api/chirps/:chirpId", getChirpHandler)
app.post("/api/chirps", createChirpHandler)
app.post("/api/users", createUserHandler)
app.post("/admin/reset", deleteUsersHandler)
app.post("/api/login", login)
app.post("/api/refresh", refreshHandler)
app.post("/api/revoke", revokeHandler)

app.get("/api/healthz", handlerReadiness)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})