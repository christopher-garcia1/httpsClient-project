import { Response, Request } from "express"
import { getAllChirps } from "../db/queries/chirps.js"


export async function getChirpsHandler(req: Request, res: Response) {
    const chirp = await getAllChirps()
    res.status(200).json(chirp)
}
