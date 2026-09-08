import express from "express"
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponse } from "./api/logResponses.js";
import { middlewareMetricsInc } from "./api/metricsInc.js";
import { handlerMetrics } from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";




const app = express();
const PORT = 8080

app.use(middlewareLogResponse)
app.use("/app", middlewareMetricsInc ,express.static("./src/app"));
app.use("/metrics", handlerMetrics)
app.use("/reset", handlerReset)

app.get("/healthz", handlerReadiness)



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})