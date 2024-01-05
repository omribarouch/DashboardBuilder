import express = require("express");
import { login, register, whoami } from "../controllers/auth";

const authRouter = express.Router();

authRouter.get('/whoami', whoami);
authRouter.post('/login', login);
authRouter.post('/register', register);

export default authRouter;