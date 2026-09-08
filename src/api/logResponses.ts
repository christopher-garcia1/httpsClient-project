import { Response, Request, NextFunction } from "express";



export function middlewareLogResponse(req: Request,res: Response,next: NextFunction):void{
    res.on("finish", () => {
        const response = res.statusCode
        if (response >= 400) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`)
        }
    })
    next()
}