import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "../index.js";
import { refreshTokens } from "../schema.js";

export async function saveRefreshToken(userId: string, token: string) {
    const [result] = await db
        .insert(refreshTokens)
        .values({
            token: token,
            userId: userId,
            expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) 
        }).returning()
    return result
} 

export async function userForRefreshToken(token: string) {
    const [result] = await db
        .select()
        .from(refreshTokens)
        .where(and(
            eq(refreshTokens.token, token),
            gt(refreshTokens.expiresAt, new Date()),
            isNull(refreshTokens.revokedAt)
        ))
    return result
}

export async function revokeRefreshToken(token: string) {
    await db.update(refreshTokens).set({
        revokedAt: new Date()
    })
        .where(eq(
            refreshTokens.token, token
        ))
}