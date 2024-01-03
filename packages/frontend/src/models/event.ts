import { Schema, model } from "mongoose";

export const EventSchema = model('Event', new Schema({
    eventSchemaID: { type: Schema.Types.ObjectId, ref: 'EventSchema', required: true },
    values: { type: Object, required: true },
  }));