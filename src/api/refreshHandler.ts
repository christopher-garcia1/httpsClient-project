import { Request, Response } from "express";
import { getBearerToken, makeJWT } from "../auth.js";
import { userForRefreshToken } from "../db/queries/refresh.js";
import { unauthorizedError } from "./middleware.js";
import { config } from "../config.js";


export async function refreshHandler(req: Request, res: Response) {
    const token = getBearerToken(req)
    const result = await userForRefreshToken(token)
    if (!result) {
        throw new unauthorizedError("invalid refresh token")
    }
    const refreshedToken = makeJWT(result.userId, 3600, config.jwt.secret)
    res.status(200).json({token: refreshedToken})
 }