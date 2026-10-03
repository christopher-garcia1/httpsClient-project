import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { unauthorizedError } from "./api/middleware.js";
import { Request } from "express";
import { randomBytes } from "node:crypto";

export async function hashPassword(password: string): Promise<string>{
    const hash = await argon2.hash(password)
    return hash
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean>{
    return await argon2.verify(hash, password)
}

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">

export function makeJWT(userID: string, expiresIn: number, secret: string): string{
    const data: payload = {
        iss: "chirpy",
        sub: userID,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + expiresIn
    }
    return jwt.sign(data, secret)
}

export function validateJWT(tokenString: string, secret: string): string{
    try { 
        const decoded = jwt.verify(tokenString, secret)
        if (typeof decoded === "string" || typeof decoded.sub !== "string") {
            throw new unauthorizedError("unauthorized")
        }
        return decoded.sub
    } catch {
        throw new unauthorizedError("unauthorized")
    }

}

export function getBearerToken(req: Request): string {
    const authHeader = req.get("Authorization")
    if (!authHeader) {
        throw new unauthorizedError("unauthorized")
    }
    const parts = authHeader.split(" ")
    if (parts[0] !== "Bearer" || !parts[1]) {
        throw new unauthorizedError("unauthorized")
    }
    return parts[1]
}


export function makeRefreshToken() {
    const buff = randomBytes(32)
    return buff.toString("hex")
}