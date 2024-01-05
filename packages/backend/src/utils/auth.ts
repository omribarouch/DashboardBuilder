import { Request, Response } from "express";
import jwt = require('jsonwebtoken');
import IUser from "../models/interfaces/user";
import { ACCESS_TOKEN_KEY } from "../../consts";

export const setAuthCookie = (user: IUser, res: Response) => {
	const authToken: string = jwt.sign(user, process.env.SECRET_KEY,{ expiresIn: '3h' });
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.cookie(ACCESS_TOKEN_KEY, authToken, { httpOnly: true });
};

export const decodeAccessToken = (req: Request): IUser => {
	try {
		const token: any = req.cookies[ACCESS_TOKEN_KEY];
		return jwt.verify(token, process.env.SECRET_KEY) as IUser;
	} catch (err) {
		console.error('Invalid token', err);
	}
}