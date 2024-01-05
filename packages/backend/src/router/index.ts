import express = require("express");
import eventSchemaRouter from './eventSchema';
import dashboardRouter from "./dashboard";
import authRouter from "./auth";
import eventRouter from "./event";

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/event-schema', eventSchemaRouter);
apiRouter.use('/event', eventRouter)
apiRouter.use('/dashboard', dashboardRouter);

export default apiRouter;