import { Request, Response } from "express";
import { DashboardModel } from "../models/dashboard";
import IChart from "../models/interfaces/chart";
import IDashboard from "../models/interfaces/dashboard";

export const createDashboard = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const creatorUsername: string = 'omby8888';
		let charts: IChart[] = [];
		if (req.body.charts) {
			charts = req.body.charts;
		}

		const dashboard = new DashboardModel({ name, charts, creatorUsername });
		await dashboard.save();
		res.status(201).send(dashboard);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
};

export const getDashboard = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const dashboard: IDashboard = await DashboardModel.findOne({ _id: id });
		res.send(dashboard);
	} catch (error) {
		res.sendStatus(400);
	}
};

export const getDashboards = async (req: Request, res: Response) => {
	try {
		const dashboards: IDashboard[] = await DashboardModel.find();
		res.send(dashboards);
	} catch (error) {
		res.sendStatus(400);
	}
};

export const updateDashboard = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const newValues = req.body;
		const updatedDashboard = await DashboardModel.findOneAndUpdate({ _id: id }, newValues, {new: true});
		res.send(updatedDashboard);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
};

export const deleteDashboard = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deletedDashboard = await DashboardModel.findByIdAndDelete(id);
		res.send(deletedDashboard);
	} catch (error) {
		res.sendStatus(400);
	}
};