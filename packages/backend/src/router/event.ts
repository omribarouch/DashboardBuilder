import { isAdmin, isAuthenticated } from "../middlewares/auth";
import { Router } from "express";
import { createEvent } from "../controllers/event";

const eventRouter = Router();

eventRouter.post('/', isAuthenticated, isAdmin, createEvent);

export default eventRouter;