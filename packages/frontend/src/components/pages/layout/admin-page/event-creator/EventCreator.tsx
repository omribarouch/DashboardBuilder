import * as React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RJSFSchema } from "@rjsf/utils";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { AppDispatch, RootState } from "../../../../../store/store";
import IEventSchema from "../../../../../models/eventSchema";
import { createEvent } from "../../../../../store/eventSlice";
import IEvent from "../../../../../models/event";
import EventSchemaPicker from "../../../../common/event-schema-picker/EventSchemaPicker";

const EventCreator = () => {
    const [eventSchema, setEventSchema] = useState<IEventSchema>(undefined);
    const [eventData, setEventData] = useState<IEvent>({ eventSchemaId: '', eventData: {} });
    const isLoading: boolean = useSelector((state: RootState) => state.events.isLoading);
    const errorMessage: string | undefined = useSelector((state: RootState) =>
        state.events.error);
    const dispatch: AppDispatch = useDispatch();

    const handleSchemaChange = (changedSchema: IEventSchema) => {
        setEventSchema(changedSchema);
        setEventData({
            ...eventData,
            eventSchemaId: changedSchema._id
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
                    <EventSchemaPicker onChange={handleSchemaChange} />
                </div>
            </form>
            
            <div className="container">
                { eventSchema &&
                    <Form schema={eventSchema.baseSchema}
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
                        {
                            errorMessage &&
                            <span className="text-danger">{ errorMessage }</span>
                        }
                    </Form>
                }
            </div>
        </>
    );
};

export default EventCreator;