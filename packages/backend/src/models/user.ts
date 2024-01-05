import { Schema, model, Model } from "mongoose";
import User from "./interfaces/user";

export const UserModel: Model<User> = model('User', new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
}));