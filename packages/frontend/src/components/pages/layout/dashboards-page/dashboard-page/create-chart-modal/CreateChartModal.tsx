import * as React from "react";
import { FC, useState } from "react";
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
	const [schemaPropertyName, setSchemaPropertyName] = useState<string>(undefined);
	const [description, setDescription] = useState<string>('');
	const [chartType, setChartType] = useState<string>(ChartType.Bar);
	const dispatch: AppDispatch = useDispatch();

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
							Object.keys((eventSchema.baseSchema as RJSFSchema).properties).map((schemaProperty: string, index: number) =>
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

			<div className="form-group">
				<label htmlFor="chartType">Chart Type</label>

				<select
					id="chartType"
					className="form-control"
					value={chartType}
					onChange={event => setChartType(event.target.value)}>
					{
						Object.keys(ChartType).map((type: string) =>
							<option key={type} value={ type }>{ type }</option>)
					}
				</select>
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