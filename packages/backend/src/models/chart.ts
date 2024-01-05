import { Schema, model } from "mongoose";

const Chart = model('Chart', new Schema({
    chartTypeID: { type: Schema.Types.ObjectId, ref: 'ChartType', required: true },
    eventSchema: { type: Schema.Types.ObjectId, ref: 'EventSchema', required: true },
    eventSchemaProperty: { type: String, required: true }
}));

export default Chart;