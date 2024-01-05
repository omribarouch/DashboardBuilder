import express = require("express");
import eventSchemaRouter from './eventSchema';
import dashboardRouter from "./dashboard";

const apiRouter = express.Router();

apiRouter.use('/event-schema', eventSchemaRouter);
apiRouter.use('/dashboard', dashboardRouter);

export default apiRouter;