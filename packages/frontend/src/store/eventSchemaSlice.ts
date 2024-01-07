import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import IEventSchema from "../models/eventSchema";
import { NameValue } from "../models/nameValue";
import { toast } from "react-toastify";

interface BreakdownObject {
	[chartId: string]: {
		isLoading: boolean;
		breakdownData?: NameValue[];
	}
}

interface BreakdownRequest {
	chartId: string;
	eventSchemaId: string;
	schemaPropertyName: string;
}

interface EventSchemaState {
	eventSchemas: IEventSchema[];
	breakdowns: BreakdownObject;
	isLoading: boolean;
	errorMessage: string | undefined;
}

const initialState: EventSchemaState = {
	eventSchemas: [],
	breakdowns: {},
	isLoading: false,
	errorMessage: undefined
};

const eventSchemaSlice = createSlice({
	name: "eventSchema",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getEventSchemas.pending, (state: EventSchemaState) => {
				state.isLoading = true;
			})
			.addCase(getEventSchemas.fulfilled, (state: EventSchemaState, action: PayloadAction<IEventSchema[]>) => {
				state.isLoading = false;
				state.eventSchemas = action.payload;
			})
			.addCase(createEventSchema.pending, (state: EventSchemaState) => {
				state.isLoading = true;
			})
			.addCase(createEventSchema.fulfilled, (state: EventSchemaState, action: PayloadAction<IEventSchema>) => {
				state.isLoading = false;
				state.eventSchemas.push(action.payload);
				toast.success(`Event ${action.payload.name} Has Been Created Successfully!`);
			})
			.addCase(createEventSchema.rejected, (state: EventSchemaState, action) => {
				state.isLoading = false;
				state.errorMessage = action.error.stack.toString();
				toast.error("Error Occurred While Creating Your Event...");
			})
			.addCase(getBreakdownBySchemaProperty.fulfilled, (state: EventSchemaState,
															  action: PayloadAction<BreakdownObject>) => {
				state.breakdowns = Object.assign({}, state.breakdowns, action.payload);
			})
			.addCase(getBreakdownBySchemaProperty.rejected, (state: EventSchemaState,
															 action: any) => {
				state.breakdowns[action.payload.chartId] = {
					isLoading: false
				};
				toast.error(`Error Occurred While Loading Chart: ${action.error.stack}`);
			});
	},
});

export const createEventSchema = createAsyncThunk(
	"eventSchema/createEventSchema",
	async (payload: IEventSchema) => {
		const newEventSchema: IEventSchema = await new HttpClient().post('/event-schema', {
			...payload
		});
		return newEventSchema;
	}
);

export const getEventSchemas = createAsyncThunk(
	"eventSchema/getEventSchemas",
	async () => {
		const eventSchemas: IEventSchema[] = await new HttpClient().get('/event-schema');
		return eventSchemas;
	}
);

export const getBreakdownBySchemaProperty = createAsyncThunk(
	"eventSchema/getBreakdownBySchemaProperty",
	async (payload: BreakdownRequest) => {
		const breakdownResponse: NameValue[] = await new HttpClient().get(`/event-schema/
		${payload.eventSchemaId}/breakdown/${payload.schemaPropertyName}`);
		const breakdown: BreakdownObject = {}
		breakdown[payload.chartId] =  {
			isLoading: false,
			breakdownData: breakdownResponse
		}
		return breakdown;
	}
);

export default eventSchemaSlice.reducer;