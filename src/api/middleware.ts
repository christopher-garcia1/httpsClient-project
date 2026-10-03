import { Response, Request, NextFunction } from "express";

export class badRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class unauthorizedError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class forbiddenError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class notFoundError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof badRequestError) {
        res.status(400).json({ error: err.message })
        console.log(err)
        return;
    }

    if (err instanceof unauthorizedError) {
        res.status(401).json({ error: err.message })
        console.log(err)
        return;
    }
    
    if (err instanceof forbiddenError) {
        res.status(403).json({ error: err.message })
        return;
    }

    if (err instanceof notFoundError) {
        res.status(404).json({ error: err.message })
        return;
    }
    
    res.status(500).json({ "error": "Something went wrong on our end" })
    console.log(err)
}