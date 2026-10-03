import { describe, it, expect, beforeAll } from "vitest"
import { makeJWT, validateJWT,hashPassword,checkPasswordHash } from "./auth.js"


describe("JWT", () => {
    const secret = "test-secret"
    const userID = "1234"

    it("creates and validates a JWT", () => {
        const token = makeJWT(userID, 3600, secret)
        const result = validateJWT(token, secret)
        expect(result).toBe(userID)
    })

    it("rejects a JWT singed with wrong secret", () => {
        const token = makeJWT(userID, 3600, secret)
   
        expect(()=>validateJWT(token, "wrong-secret")).toThrow()
    })

    it("rejects expired JWT", () => {
        const token = makeJWT(userID, -1, secret)
        expect(()=>validateJWT(token,secret)).toThrow()
    })
})

describe("Password Hashing", () => {
    const password = "correctPassword1234!"
    const password2 = "anotherPassword456!"
    let hash1: string;
    let hash2: string;

    beforeAll(async () => {
        hash1 = await hashPassword(password)
        hash2 = await hashPassword(password2)
    })

    it("should return true for correct password", async () => {
        const result = await checkPasswordHash(password, hash1)
        expect(result).toBe(true)
    })

    it("should return false for incorrect password", async () => {
        const result = await checkPasswordHash(password, hash2)
        expect(result).toBe(false)
    })
})