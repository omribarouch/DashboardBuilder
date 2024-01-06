import { Request, Response } from "express";
import { DashboardModel } from "../models/dashboard";
import IChart from "../models/interfaces/chart";
import IdentifiedRequest from "../models/interfaces/identifiedRequest";

export const createDashboard = async (req: IdentifiedRequest, res: Response) => {
	const { name, description } = req.body;
	const creatorUsername: string = req.identity.username;
	let charts: IChart[] = [];
	if (req.body.charts) {
		charts = req.body.charts;
	}

	new DashboardModel({ name, description, charts, creatorUsername }).save()
		.then(dashboard => res.status(201).send(dashboard))
		.catch(reason => res.status(500)
			.send({ error: `Server Error occurred while trying to create dashboard: ${reason}` }));
};

export const getDashboard = async (req: Request, res: Response) => {
	const { id } = req.params;
	DashboardModel.findOne({ _id: id })
		.then(dashboard => res.send(dashboard))
		.catch(reason => res.status(500)
			.send({ error: `Server Error occurred while trying to get dashboard: ${reason}` }));
};

export const getDashboards = async (req: Request, res: Response) => {
	DashboardModel.find()
		.then(dashboards => res.send(dashboards))
		.catch(reason => res.status(500)
			.send({ error: `Server Error occurred while trying to get dashboard: ${reason}` }));
};

export const updateDashboard = async (req: Request, res: Response) => {
	const { id } = req.params;
	const newValues = req.body;
	DashboardModel.findOneAndUpdate({ _id: id }, newValues, {new: true})
		.then(updatedDashboard => res.send(updatedDashboard))
		.catch(reason => res.status(500)
			.send({ error: `Server Error occurred while trying to get dashboard: ${reason}` }));
};

export const deleteDashboard = async (req: Request, res: Response) => {
	const { id } = req.params;
	DashboardModel.findByIdAndDelete(id)
		.then(deletedDashboard => res.send(deletedDashboard))
		.catch(reason => res.status(500)
			.send({ error: `Server Error occurred while trying to get dashboard: ${reason}` }));

};