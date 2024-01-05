import IEventSchema from "../models/interfaces/eventSchema";
import Ajv, { ValidateFunction } from "ajv";

export const createSchemaValidator = (eventSchema: IEventSchema): ValidateFunction => {
	const ajv = new Ajv({ allErrors: false })
	return ajv.compile(eventSchema.baseSchema);
}