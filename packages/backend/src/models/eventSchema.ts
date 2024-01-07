import { Schema, model } from "mongoose";

export const EventSchemaModel = model("EventSchema", new Schema({
    name: { type: String, required: true },
    baseSchema: { type: Object, required: true, },
    uiSchema: { type: Object, required: true },
}));