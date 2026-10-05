import { Request, Response } from "express";
import { upgradeUser } from "../db/queries/users.js";
import { config } from "../config.js";
import { unauthorizedError } from "./middleware.js";
import { getApiKey } from "../auth.js";

type webhook = {
    "event": string,
    "data": {
        userId: string
    }
}

export async function upgradeUserHandler(req: Request, res: Response) {
    const params: webhook = req.body 
    if (params.event !== "user.upgraded") {
        return res.status(204).end()
   
    }
    const token = getApiKey(req)
    console.log("TOKEN:", token);
    console.log("EXPECTED:", config.polka.key);
    if (token !== config.polka.key) {
        throw new unauthorizedError("unauthorized")
    }
    await upgradeUser(params.data.userId)
    return res.status(204).end()
}