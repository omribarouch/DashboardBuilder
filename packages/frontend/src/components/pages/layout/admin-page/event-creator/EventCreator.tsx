import * as React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import { RJSFSchema } from "@rjsf/utils";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { RootState } from "../../../../../store/store";

const EventCreator = () => {
    const eventSchemas: RJSFSchema[] = useSelector((state: RootState) => state.eventSchemas.eventSchemas);
    const [pickedSchema, setPickedSchema] = useState<string>('');

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
                                eventSchemas.map(eventSchema => <option value={JSON.stringify(eventSchema)}>{eventSchema.title}</option>)
                            }
                        </select>
                    </div>
                </div>
            </form>
            
            <div className="container">
                { pickedSchema &&
                    <Form schema={JSON.parse(pickedSchema)} validator={validator} />
                }
            </div>
        </>
    );
};

export default EventCreator;