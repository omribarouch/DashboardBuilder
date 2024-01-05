import { Schema, model, Model } from "mongoose";
import EventSchema from "./interfaces/eventSchema";
import * as mongoose from "mongoose";

const EventSchemaModel = model("EventSchema", new Schema({
    name: { type: String, required: true },
    baseSchema: { type: Object, required: true, },
    uiSchema: { type: Object, required: true },
}));

export default EventSchemaModel;