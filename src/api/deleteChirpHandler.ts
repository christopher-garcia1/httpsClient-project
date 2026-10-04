import { Request, Response } from "express";
import { deleteChrip, getChirp } from "../db/queries/chirps.js";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { forbiddenError, notFoundError } from "./middleware.js";

export async function deleteChirpHandler(req: Request, res: Response) {
    const chirpId = req.params.chirpId
    if (typeof chirpId !== "string") {
        throw new Error("Something went wrong")
    }
    const token = getBearerToken(req)
    const authUserId = validateJWT(token, config.jwt.secret)
    const chirp = await getChirp(chirpId)
    if (!chirp) {
        throw new notFoundError("chirp not found")
    }
    if (chirp.userId !== authUserId) {
        throw new forbiddenError("cannot delete chirp")
    }
    await deleteChrip(chirp.id, authUserId)
    res.status(204).send()
}