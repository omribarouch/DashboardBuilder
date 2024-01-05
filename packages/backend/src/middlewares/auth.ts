import { Request, Response, NextFunction } from "express";
import { merge } from 'lodash';
import { ACCESS_TOKEN_KEY } from "../../consts";
import { decodeAccessToken } from "../utils/auth";
import IUser from "../models/interfaces/user";
import IdentifiedRequest from "../models/interfaces/identifiedRequest";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken: string = req.cookies[ACCESS_TOKEN_KEY];

        if (!accessToken) {
            return res.status(401).send({ error: "You must authenticate in order to use that api." });
        }

        const existingUser: IUser = decodeAccessToken(req);
        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAdmin = async (req: IdentifiedRequest, res: Response, next: NextFunction) => {
  if (!req.identity) {
      return res.status(401).send({ error: "You must authenticate in order to use that api." });
  }

  if (!req.identity.isAdmin) {
      return res.status(403).send({ error: "You don't have permission to use that api." });
  }

  return next();
};