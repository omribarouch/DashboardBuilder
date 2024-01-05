import express = require("express");
import {
	createDashboard,
	deleteDashboard,
	getDashboard,
	getDashboards,
	updateDashboard
} from "../controllers/dashboard";
import { isAuthenticated } from "../middlewares/auth";

const dashboardRouter = express.Router();

dashboardRouter.get('/', isAuthenticated, getDashboards);
dashboardRouter.get('/:id', isAuthenticated, getDashboard);
dashboardRouter.post('/', isAuthenticated, createDashboard);
dashboardRouter.put('/:id', isAuthenticated, updateDashboard);
dashboardRouter.delete('/:id', isAuthenticated, deleteDashboard);

export default dashboardRouter;