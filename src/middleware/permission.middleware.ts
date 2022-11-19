import { Request, Response } from "express";

export const PermissionMiddleware = (access: string) => {
    return async (req: Request, res: Response, next: Function) => {

    }
}