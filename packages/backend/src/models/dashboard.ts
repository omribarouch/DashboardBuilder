import { Schema, model } from "mongoose";
import Dashboard from "./interfaces/dashboard";
import Chart from "./chart";

const DashboardModel = model('Dashboard', new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    creatorUsername: { type: String, required: true },
    charts: { type: [Chart], required: true }
}));

export default DashboardModel;