import { Schema, model } from "mongoose";

export const ChartType = model('ChartType', new Schema({
    name: { type: String, required: true }
  }));