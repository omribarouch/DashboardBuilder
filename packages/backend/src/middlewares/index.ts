import express = require("express");
import { merge, get } from 'lodash';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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