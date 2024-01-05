import { Schema, model } from "mongoose";

export const EventModel = model('Event', new Schema({
    eventSchemaID: { type: Schema.Types.ObjectId, ref: 'EventSchema', required: true },
    eventData: { type: Object, required: true },
}));

export default EventModel;