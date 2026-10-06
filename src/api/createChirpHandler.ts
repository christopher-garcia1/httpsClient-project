import { Response, Request } from "express";
import { createChirp } from "../db/queries/chirps.js";
import { badRequestError} from "./middleware.js";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";

type createChirpRequest = {
    body: string,
    userId: string
}

export async function createChirpHandler(req: Request, res: Response) {
    const params: createChirpRequest = req.body
    const body = params.body
    if (body.length > 140) {
        throw new badRequestError("Chirp is too long. Max length is 140")
    }
    const words = body.split(" ")
    const badWords = ["kerfuffle", "sharbert", "fornax"]
    for (let i = 0; i < words.length; i++){
        const currentItem = words[i]
        if (badWords.includes(currentItem.toLowerCase())) {
            words[i] = "****"
        }
    }
    const cleanedBody = words.join(" ")
    const token = getBearerToken(req)
    const authUserId = validateJWT(token, config.jwt.secret)




    const chirp = await createChirp({ body: cleanedBody, userId: authUserId })
    return res.status(201).json(chirp)
}

