import { Request, Response } from "express";
import IEventSchema from "../models/interfaces/eventSchema";
import { EventSchemaModel } from "../models/eventSchema";
import { EventModel } from "../models/event";
import Ajv, { ValidateFunction } from "ajv";
import { createSchemaValidator } from "../utils/event";

export const createEvent = async (req: Request, res: Response) => {
	const { eventSchemaId } = req.body;
	EventSchemaModel.findOne({ _id: eventSchemaId }).then((rawEventSchema) => {
		if (!rawEventSchema) {
			res.status(400).send({ error: `No EventSchema has been found with id ${eventSchemaId}` });
		}

		const eventSchema: IEventSchema = rawEventSchema.toObject();
		const { eventData } = req.body;
		const validate: ValidateFunction = createSchemaValidator(eventSchema);

		const isEventValid: boolean = validate(eventData);
		if (!isEventValid) {
			res.status(400).send(validate.errors);
		}

		new EventModel({ eventSchemaId, eventData }).save().then(rawEvent => {
			res.status(201).send(rawEvent.toObject());
		});
	});
};