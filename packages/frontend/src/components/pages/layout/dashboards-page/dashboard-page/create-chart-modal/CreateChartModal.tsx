import * as React from "react";
import { FC, useEffect, useState } from "react";
import { AppDispatch } from "../../../../../../store/store";
import { useDispatch } from "react-redux";
import { RJSFSchema } from "@rjsf/utils";
import { createChart } from "../../../../../../store/dashboardSlice";
import { closeModal } from "../../../../../../store/modalSlice";
import { IDashboard } from "../../../../../../models/dashboard";
import EventSchemaPicker from "../../../../../common/event-schema-picker/EventSchemaPicker";
import IEventSchema from "../../../../../../models/eventSchema";
import ChartType from "../../../../../../models/chartType";

interface CreateDashboardModalProps {
	currentDashboard: IDashboard;
}

const CreateChartModal: FC<CreateDashboardModalProps> = ({ currentDashboard }) => {
	const [eventSchema, setEventSchema] = useState<IEventSchema>(undefined);
	const [propertiesNames, setPropertiesNames] = useState<string[]>([]);
	const [schemaPropertyName, setSchemaPropertyName] = useState<string>(undefined);
	const [description, setDescription] = useState<string>('');
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if(eventSchema) {
			setPropertiesNames(Object.keys((eventSchema.baseSchema as RJSFSchema).properties));
		}
	}, [eventSchema]);

	return (
		<div className="container d-flex row gap-3">
			<EventSchemaPicker onChange={eventSchema => {
				setEventSchema(eventSchema);
				setSchemaPropertyName(undefined);
			}} />

			{
				eventSchema &&
				<div className="form-group">
					<label htmlFor="schemaProperty">Schema Property</label>

					<select
						id="schemaProperty"
						className="form-control"
						value={schemaPropertyName}
						onChange={event => setSchemaPropertyName(event.target.value)}>
						<option key="default" value={ undefined } />
						{
							propertiesNames.map((schemaProperty: string, index: number) =>
								<option key={ `${ schemaProperty }-${ index }` }
										value={ schemaProperty }>{ schemaProperty }</option>)
						}
					</select>
				</div>
			}

			<div className="form-group">
				<label htmlFor="description">Chart Description</label>

				<input
					type="text"
					className="form-control"
					id="description"
					placeholder="Enter chart description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<button className="btn btn-primary btn-block"
					onClick={() => {
						dispatch(createChart({
							dashboardId: currentDashboard._id,
							eventSchemaId: eventSchema._id,
							schemaPropertyName: schemaPropertyName,
							chartType: ChartType.Bar
						}));
						dispatch(closeModal());
					}}>
				Create
			</button>
		</div>
	);
}

export default CreateChartModal;