
import { Response, Request } from "express";
import { createUser } from "../db/queries/users.js";
type createUserRequest = {
    email: string
}
export async function createUserHandler(req: Request, res: Response) {
    const params: createUserRequest = req.body
    const email = params.email
    const newUser = await createUser({ email })
    res.status(201).json(newUser)    
}