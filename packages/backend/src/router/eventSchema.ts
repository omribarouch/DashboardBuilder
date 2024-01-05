import express = require("express");

import { isAuthenticated } from '../middlewares';
import {createEventSchema, deleteEventSchema, getAllEventSchemas} from "../controllers/eventSchema";

const eventSchemaRouter = express.Router();

eventSchemaRouter.get('/'/*, isAuthenticated*/, getAllEventSchemas);
eventSchemaRouter.post('/'/*, isAuthenticated*/, createEventSchema);
eventSchemaRouter.delete('/:id'/*, isAuthenticated*/, deleteEventSchema);

export default eventSchemaRouter;