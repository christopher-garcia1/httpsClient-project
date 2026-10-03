import { Response, Request } from "express";
import { getUser } from "../db/queries/users.js";
import { checkPasswordHash, makeJWT , makeRefreshToken} from "../auth.js";
import { unauthorizedError } from "./middleware.js";
import { UserResponse } from "./createUserHandler.js";
import { config } from "../config.js";
import { saveRefreshToken } from "../db/queries/refresh.js";

type loginUserRequest = {
    password: string,
    email: string,
}

type authUserResponse = UserResponse & {token: string} & {refreshToken: string}

export async function login(req: Request, res: Response) {
    const params : loginUserRequest= req.body
    const grabbedUser = await getUser(params.email)
    const passwordCheck = await checkPasswordHash(params.password, grabbedUser.hashedPassword)
    if (!passwordCheck) {
       throw new unauthorizedError('incorrect email or password')
    }

    

    const token = makeJWT(grabbedUser.id, 3600, config.jwt.secret)
    const refreshToken = makeRefreshToken()
    const saveRefresh = await saveRefreshToken(grabbedUser.id, refreshToken)
    if (!saveRefresh) {
        throw new Error("could not save refresh token")
    }


    const { hashedPassword, ...rest } = grabbedUser
    const publicInfo : authUserResponse = {...rest, token, refreshToken}
    res.status(200).json(publicInfo)
}