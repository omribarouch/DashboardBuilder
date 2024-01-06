import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RJSFSchema } from "@rjsf/utils";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { AppDispatch, RootState } from "../../../../../store/store";
import { getEventSchemas } from "../../../../../store/eventSchemaSlice";
import IEventSchema from "../../../../../models/event-schema.interface";
import { createEvent } from "../../../../../store/eventSlice";
import IEvent from "../../../../../models/event.interface";

const EventCreator = () => {
    const eventSchemas: IEventSchema[] = useSelector((state: RootState) => state.eventSchemas.eventSchemas);
    const [pickedSchemaId, setPickedSchemaId] = useState<string>('');
    const [pickedEventSchema, setPickedEventSchema] = useState<RJSFSchema>({});
    const [eventData, setEventData] = useState<IEvent>({ eventSchemaId: null, eventData: {} });
    const dispatch: AppDispatch = useDispatch();
    const isLoading: boolean = useSelector((state: RootState) => state.events.isLoading);

    useEffect(() => {
        dispatch(getEventSchemas());
    });

    const handleSchemaChange = (event) => {
        const eventSchemaId: string = event.target.value;
        setPickedSchemaId(eventSchemaId);
        setPickedEventSchema(eventSchemas.find(eventSchema => eventSchema._id === eventSchemaId).baseSchema);
        setEventData({
            ...eventData,
            eventSchemaId: eventSchemaId
        });
    };

    const handleFormChange = (event) => {
        setEventData({
            ...eventData,
            eventData: event.formData
        });
    }

    return (
        <>  
            <form>
                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="schemaPicker">Event Schema</label>

                        <select
                            id="schemaPicker"
                            className="form-control"
                            value={pickedSchemaId}
                            onChange={handleSchemaChange}
                        >
                            {
                                eventSchemas.map(eventSchema =>
                                    <option value={eventSchema._id}>{eventSchema.name}</option>)
                            }
                        </select>
                    </div>
                </div>
            </form>
            
            <div className="container">
                { pickedSchemaId &&
                    <Form schema={pickedEventSchema}
                          validator={validator}
                          onChange={handleFormChange}>
                        <button
                            className='btn btn-primary'
                            disabled={isLoading}
                            onClick={() => dispatch(createEvent(eventData))}>
                            { isLoading &&
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            }
                            Trigger Event
                        </button>
                    </Form>
                }
            </div>
        </>
    );
};

export default EventCreator;