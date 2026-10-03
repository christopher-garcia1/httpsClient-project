import { Request, Response } from "express"
import { getBearerToken } from "../auth.js"
import { revokeRefreshToken } from "../db/queries/refresh.js"

export async function revokeHandler(req: Request, res: Response) {
    const token = getBearerToken(req)
    await revokeRefreshToken(token)
    res.status(204).end()
}