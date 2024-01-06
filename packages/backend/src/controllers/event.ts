import { Request, Response } from "express";
import IEventSchema from "../models/interfaces/eventSchema";
import { EventSchemaModel } from "../models/eventSchema";
import { EventModel } from "../models/event";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: false });

export const createEvent = async (req: Request, res: Response) => {
	const { eventSchemaId } = req.body;
	EventSchemaModel.findOne({ _id: eventSchemaId })
		.then((rawEventSchema) => {
			if (!rawEventSchema) {
				return res.status(400).send({ error: `No EventSchema has been found with id ${eventSchemaId}` });
			}

			const eventSchema: IEventSchema = rawEventSchema.toObject();
			const { eventData } = req.body;
			const isEventValid: boolean = ajv.validate(eventSchema.baseSchema, eventData);
			if (!isEventValid) {
				return res.status(400).send(ajv.errors);
			}

			new EventModel({ eventSchemaId, eventData }).save()
				.then(rawEvent => {
					return res.status(201).send(rawEvent.toObject());
				})
				.catch(reason => res.status(500)
					.send({ error: `Server Error occurred while trying to create event: ${reason}` }));
		})
		.catch(reason => res.status(500)
			.send({ error: `Server Error occurred while trying to create event: ${reason}` }));
};