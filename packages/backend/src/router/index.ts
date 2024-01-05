import express = require("express");
import eventSchemaRouter from './eventSchema';

const apiRouter = express.Router();

apiRouter.use('/event-schema', eventSchemaRouter);

export default apiRouter;