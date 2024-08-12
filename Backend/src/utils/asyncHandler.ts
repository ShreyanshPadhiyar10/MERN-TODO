import { RequestHandler, Request, Response, NextFunction } from "express"

const asyncHandler = (requestHandler: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error: any) => next(error))
}

export { asyncHandler }