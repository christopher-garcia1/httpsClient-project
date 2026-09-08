import { Response, Request } from "express";
import { config } from "../config.js";

export function handlerReset(req: Request, res: Response) {
    config.fileserverHits = 0
    res.sendStatus(200)
}