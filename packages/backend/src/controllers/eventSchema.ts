import { EventSchemaModel } from "../models/eventSchema";
import { Request, Response } from "express";
import IEventSchema from "../models/interfaces/eventSchema";
import IdentifiedRequest from "../models/interfaces/identifiedRequest";

export const createEventSchema = async (req: Request, res: Response) => {
    try {
        const { name, baseSchema, uiSchema } = req.body;
        const eventSchema = new EventSchemaModel({ name, baseSchema, uiSchema });
        await eventSchema.save();
        res.status(201).send(eventSchema);
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getAllEventSchemas = async (req: IdentifiedRequest, res: Response) => {
    try {
        const eventSchemas: IEventSchema[] = await EventSchemaModel.find();
        res.send(eventSchemas);
    } catch (error) {
        res.sendStatus(400);
    }
};

export const deleteEventSchema = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedEventSchema: IEventSchema[] = await EventSchemaModel.findByIdAndDelete(id);
        res.send(deletedEventSchema);
    } catch (error) {
        res.sendStatus(400);
    }
};