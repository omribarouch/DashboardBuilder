import EventSchemaModel from "../models/eventSchema";
import eventSchema from "../models/eventSchema";
import { Request, Response, NextFunction } from "express";

export const createEventSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, baseSchema, uiSchema } = req.body;
        const eventSchema = new EventSchemaModel({ name, baseSchema, uiSchema });
        await eventSchema.save();
        res.send(eventSchema).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    } finally {
        next();
    }
};

export const getAllEventSchemas = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const eventSchemas = await eventSchema.find();
        res.send(eventSchemas).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    } finally {
        next();
    }
};

export const deleteEventSchema = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { id } = req.query;
        const deletedUser = await eventSchema.findOneAndDelete({ _id: id });
        res.send(deletedUser).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    } finally {
        next();
    }
};