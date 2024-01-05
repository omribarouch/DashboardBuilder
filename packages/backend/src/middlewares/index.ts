import { Request, Response, NextFunction } from "express";
import { merge } from 'lodash';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['Authorization'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await {};

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}