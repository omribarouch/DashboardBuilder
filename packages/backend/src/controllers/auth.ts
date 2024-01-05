import { Request, Response } from "express";
import { UserModel } from "../models/user";
import IUser from "../models/interfaces/user";
import { setAuthCookie } from "../utils/auth";

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	UserModel.findOne({ username })
		.then(rawExistingUser => {
			if (!rawExistingUser) {
				return res.status(401).send({ error: `Can't find user with the username: ${ username }.` });
			}

			const existingUser: IUser = rawExistingUser.toObject();
			if (existingUser.password !== password) {
				return res.status(403).send({ error: 'The password you entered is incorrect.' });
			}

			setAuthCookie(existingUser, res);
			return res.send(existingUser);
		})
		.catch(reason => res.status(500)
			.send({ error: `Server Error occurred while trying to register user: ${reason}` }));
};

export const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	new UserModel({ username, password }).save()
		.then((newUser) => {
			setAuthCookie(newUser.toObject(), res);
			return res.send(newUser);
		})
		.catch(reason => res.status(500)
			.send({ error: `Server Error occurred while trying to register user: ${reason}` }));
};