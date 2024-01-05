import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RJSFSchema } from "@rjsf/utils";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { AppDispatch, RootState } from "../../../../../store/store";
import { getEventSchemas } from "../../../../../store/eventSchemaSlice";
import IEventSchema from "../../../../../models/event-schema.interface";

const EventCreator = () => {
    const eventSchemas: IEventSchema[] = useSelector((state: RootState) => state.eventSchemas.eventSchemas);
    const [pickedSchema, setPickedSchema] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getEventSchemas());
    }, []);

    const handleChange = (event) => {
        setPickedSchema(event.target.value);
    };

    return (
        <>  
            <form>
                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="schemaPicker">Event Schema</label>

                        <select
                            id="schemaPicker"
                            className="form-control"
                            value={pickedSchema}
                            onChange={handleChange}
                        >
                            {
                                eventSchemas.map(eventSchema =>
                                    <option value={JSON.stringify(eventSchema)}>{eventSchema.name}</option>)
                            }
                        </select>
                    </div>
                </div>
            </form>
            
            <div className="container">
                { pickedSchema &&
                    <Form schema={JSON.parse(pickedSchema).baseSchema} validator={validator} />
                }
            </div>
        </>
    );
};

export default EventCreator;