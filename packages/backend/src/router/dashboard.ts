import express = require("express");
import {
	createDashboard,
	deleteDashboard,
	getDashboard,
	getDashboards,
	updateDashboard
} from "../controllers/dashboard";

const dashboardRouter = express.Router();

dashboardRouter.get('/', getDashboards);
dashboardRouter.get('/:id', getDashboard);
dashboardRouter.post('/', createDashboard);
dashboardRouter.put('/:id', updateDashboard);
dashboardRouter.delete('/:id', deleteDashboard);

export default dashboardRouter;