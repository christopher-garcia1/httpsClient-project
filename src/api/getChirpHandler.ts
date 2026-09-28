import { Response, Request } from "express";
import { getChirp } from "../db/queries/chirps.js";
import { badRequestError } from "./middleware.js";

export async function getChirpHandler(req: Request, res: Response) {
    const chirpId = req.params.chirpId
    if (typeof chirpId !== "string") {
        throw new badRequestError("chirpId is required")
    }
    const chirp = await getChirp(chirpId)
    res.status(200).json(chirp)
}