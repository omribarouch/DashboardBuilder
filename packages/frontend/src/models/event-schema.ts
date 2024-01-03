import { Schema, model } from "mongoose";

export const EventSchema = model('Schema', new Schema({
    schema: { type: Object, required: true}
}));