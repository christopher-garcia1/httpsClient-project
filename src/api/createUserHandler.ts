
import { Response, Request } from "express";
import { createUser } from "../db/queries/users.js";
import { hashPassword } from "../auth.js";
import { User } from "../db/schema.js";

type createUserRequest = {
    password: string,
    email: string
}

export type UserResponse = Omit<User, "hashedPassword">


export async function createUserHandler(req: Request, res: Response){
    const params: createUserRequest = req.body
    const email = params.email
    const password = params.password
    const hashed = await hashPassword(password)
    const newUser = await createUser({ email, hashedPassword: hashed })
    const { hashedPassword, ...rest } = newUser
    const publicInfo: UserResponse = rest
    return res.status(201).json(publicInfo)    
}