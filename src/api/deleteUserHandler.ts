import { deleteUsers } from "../db/queries/users.js";
import { config } from "../config.js";
import { forbiddenError } from "./middleware.js";
import { Response ,Request} from "express";

export async function deleteUsersHandler(_req:Request,res:Response) {
    if (config.api.platform !== "dev") {
        throw new forbiddenError("FORBIDDEN")
    }
    config.api.fileserverHits = 0

    await deleteUsers()
    res.status(200).send("OK")
}