import { Request } from "express";
import IUser from "./user";

interface IdentifiedRequest extends Request {
	identity: IUser;
}

export default IdentifiedRequest;