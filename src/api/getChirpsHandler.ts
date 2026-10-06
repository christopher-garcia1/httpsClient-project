import { Response, Request } from "express"
import { getAllChirps, getAllChirpsByUser } from "../db/queries/chirps.js"


export async function getChirpsHandler(req: Request, res: Response) {
    let authorId = "";
    let authorIdQuery = req.query.authorId
    if (typeof authorIdQuery === "string") {
        authorId = authorIdQuery
        const chirps = await getAllChirpsByUser(authorId)
        res.status(200).json(chirps)
    }
    let sort = "";
    let sortQuery = req.query.sort
    if (sortQuery === "desc") {
        const chirp = (await getAllChirps()).reverse()
        return res.status(200).json(chirp)
    }
    const chirp = await getAllChirps()
    return res.status(200).json(chirp)
}
