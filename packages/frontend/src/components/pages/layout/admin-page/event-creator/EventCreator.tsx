import * as React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { AppDispatch, RootState } from "../../../../../store/store";
import IEventSchema from "../../../../../models/eventSchema";
import { createEvent } from "../../../../../store/eventSlice";
import EventSchemaPicker from "../../../../common/event-schema-picker/EventSchemaPicker";

const EventCreator = () => {
    const [eventSchema, setEventSchema] = useState<IEventSchema>(undefined);
    const [eventData, setEventData] = useState<object>({});
    const isLoading: boolean = useSelector((state: RootState) => state.events.isLoading);
    const errorMessage: string | undefined = useSelector((state: RootState) =>
        state.events.error);
    const dispatch: AppDispatch = useDispatch();

    const handleSchemaChange = (changedSchema: IEventSchema | undefined) => {
        setEventSchema(changedSchema);
        setEventData(undefined);
    };

    return (
        <>
            <form>
                <div className="form-group">
                    <EventSchemaPicker onChange={handleSchemaChange} />
                </div>
            </form>

            { eventSchema &&
                <div className="container card p-0 mt-3">
                    <div className="card-header">
                        <h2>Trigger Event</h2>
                    </div>

                    <Form schema={ eventSchema.baseSchema }
                          formData={ eventData }
                          validator={ validator }
                          className="card-body"
                          onChange={({ formData }) => setEventData(formData)}>
                        <button
                            className='btn btn-primary'
                            disabled={ isLoading }
                            onClick={() => dispatch(createEvent({
                                eventSchemaId: eventSchema._id,
                                eventData: eventData
                            }))}>
                            {
                                isLoading &&
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            }
                            Trigger Event
                        </button>
                        {
                            errorMessage &&
                            <span className="text-danger">{ errorMessage }</span>
                        }
                    </Form>
                </div>
            }
        </>
    );
};

export default EventCreator;