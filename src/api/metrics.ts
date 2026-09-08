import { config } from "../config.js";
import { Response, Request, NextFunction } from "express";

export async function handlerMetrics(req: Request, res: Response, next: NextFunction) {
    res.set("Content-Type", "text/plain; charset=utf-8")
    res.status(200).send(`Hits: ${config.fileserverHits}`)
    next()
}