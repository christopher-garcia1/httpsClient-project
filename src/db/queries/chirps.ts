import { forbiddenError, notFoundError} from "../../api/middleware.js";
import { db } from "../index.js";
import { NewChirp, chirps } from "../schema.js";
import { and, asc, eq } from "drizzle-orm";



export async function createChirp(chirp: NewChirp) {
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .returning()
    return result
    
}


export async function getAllChirps() {
    const result = await db.select().from(chirps).orderBy(asc(chirps.createdAt))
    return result
}

export async function getChirp(chirpId: string) {
    const [result] = await db.select().from(chirps).where(eq(chirps.id, chirpId))
    if (!result) {
        throw new notFoundError("IDNOTFOUND")
    }
    return result
}

export async function deleteChrip(chirpId: string, userId:string) {
    const [result] = await db
        .delete(chirps)
        .where(and(
            eq(chirps.id, chirpId),
            eq(chirps.userId, userId)
        ))
}