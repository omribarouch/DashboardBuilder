import { EventSchemaModel } from "../models/eventSchema";
import { Request, Response } from "express";
import IEventSchema from "../models/interfaces/eventSchema";
import IdentifiedRequest from "../models/interfaces/identifiedRequest";
import { EventModel } from "../models/event";

export const createEventSchema = async (req: Request, res: Response) => {
    const { name, baseSchema, uiSchema } = req.body;
    new EventSchemaModel({ name, baseSchema, uiSchema }).save()
        .then(eventSchema => res.status(201).send(eventSchema))
        .catch(reason => res.status(500)
            .send({ error: `Server Error occurred while trying to create event schema: ${reason}` }))
};

export const getAllEventSchemas = async (req: IdentifiedRequest, res: Response) => {
    EventSchemaModel.find()
        .then((eventSchemas) => res.send(eventSchemas))
        .catch(reason => res.status(500)
            .send({ error: `Server Error occurred while trying to get event schemas: ${reason}` }));
};

export const getBreakdownBySchemaProperty = async (req: IdentifiedRequest, res: Response) => {
    const { id, schemaProperty } = req.params;
    EventSchemaModel.findById(id)
        .then(rawEventSchema => {
            const eventSchema: IEventSchema = rawEventSchema.toObject();
            if (!eventSchema.baseSchema.hasOwnProperty(schemaProperty)) {
                return res.status(400)
                    .send({ error: `No such property named ${schemaProperty} in event schema ${id}`});
            }

            EventModel.aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }])
                .exec((err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        })
        .catch(reason => res.status(500)
            .send({ error: `Server Error occurred while trying to get breakdown by schema property: ${reason}` }));
};

export const deleteEventSchema = async (req: Request, res: Response) => {
    const { id } = req.params;
    EventSchemaModel.findByIdAndDelete(id)
        .then(deletedEventSchema => res.send(deletedEventSchema))
        .catch(reason => res.status(500)
            .send({ error: `Server Error occurred while trying to delete event schema: ${reason}` }))
};