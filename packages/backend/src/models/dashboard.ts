import { Schema, model } from "mongoose";
import ChartType from "./interfaces/chartType";

export const DashboardModel = model('Dashboard', new Schema({
    name: { type: String, required: true },
    creatorUsername: { type: String, required: true },
    charts: [{
        type: { type: String, enum: ChartType, required: true },
        eventSchemaId: { type: Schema.Types.ObjectId, required: true },
        schemaPropertyName: { type: String, required: true },
        description: String,
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true }
    }]
}));