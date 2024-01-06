import * as React from "react";
import IEventSchema from "../../../models/eventSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { RJSFSchema } from "@rjsf/utils";
import { getEventSchemas } from "../../../store/eventSchemaSlice";

interface EventSchemaSelectProps {
	onChange: (changedSchema: IEventSchema) => void;
}

const EventSchemaPicker: FC<EventSchemaSelectProps> = ({ onChange }) => {
	const eventSchemas: IEventSchema[] = useSelector((state: RootState) =>
		state.eventSchemas.eventSchemas);
	const [pickedSchema, setPickedSchema] = useState<IEventSchema>(undefined);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getEventSchemas());
	}, []);

	const handleChange = (event) => {
		let schemaValue: IEventSchema | undefined = undefined;
		try {
			schemaValue = JSON.parse(event.target.value)
			setPickedSchema(schemaValue);
		} catch (error) {
			setPickedSchema(schemaValue);
		} finally {
			onChange(schemaValue);
		}
	}

	return (
		<div className="form-control border-0">
			<label htmlFor="schemaPicker">Event Schema</label>

			<select
				id="schemaPicker"
				className="form-control"
				value={JSON.stringify(pickedSchema)}
				onChange={handleChange}>
				<option key="default" value={ undefined } />
				{
					eventSchemas.map(eventSchema =>
						<option key={eventSchema._id} value={JSON.stringify(eventSchema)}>{eventSchema.name}</option>)
				}
			</select>
		</div>
	)
}

export default EventSchemaPicker;