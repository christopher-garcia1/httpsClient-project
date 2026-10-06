import { Request, Response } from "express";
import { getBearerToken, hashPassword, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { loginUserRequest } from "./loginHandler.js";
import { badRequestError } from "./middleware.js";
import { updateUser } from "../db/queries/users.js";
import { UserResponse } from "./createUserHandler.js";




export async function updateUserHandler(req: Request, res: Response) {
    const params: loginUserRequest = req.body
    const token = getBearerToken(req)
    const authUserId = validateJWT(token, config.jwt.secret)
    if (!params.email || !params.password) {
        throw new badRequestError("Missing required fiels")
    }
    const password = await hashPassword(params.password)
    const { hashedPassword, ...rest } = await updateUser(authUserId, params.email, password)
    const publicInfo: UserResponse = rest
    return res.status(200).json(publicInfo)
}