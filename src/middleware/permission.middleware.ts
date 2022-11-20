import { Request, Response } from "express";
import { User } from "../entity/user.entity";

export const PermissionMiddleware = (access: string) => {
    return (req: Request, res: Response, next: Function) => {
        const user: User = req.user;
        console.log(user);
        next();
    }
}