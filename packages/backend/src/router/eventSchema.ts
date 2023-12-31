import express = require("express");

import { isAdmin, isAuthenticated } from '../middlewares/auth';
import {
	createEventSchema,
	deleteEventSchema,
	getAllEventSchemas,
	getBreakdownBySchemaProperty
} from "../controllers/eventSchema";

const eventSchemaRouter = express.Router();

eventSchemaRouter.get('/', isAuthenticated, getAllEventSchemas);
eventSchemaRouter.get('/:id/breakdown/:schemaProperty', isAuthenticated, getBreakdownBySchemaProperty);
eventSchemaRouter.post('/', isAuthenticated, isAdmin, createEventSchema);
eventSchemaRouter.delete('/:id', isAuthenticated, isAdmin, deleteEventSchema);

export default eventSchemaRouter;