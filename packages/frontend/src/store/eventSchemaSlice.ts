import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import IEventSchema from "../../../models/eventSchema";
import { NameValue } from "../models/nameValue";

interface BreakdownObject {
	[chartId: string]: {
		isLoading: boolean;
		error?: string | undefined;
		breakdownData?: NameValue[];
	}
}

interface BreakdownRequest {
	chartId: string;
	eventSchemaId: string;
	schemaPropertyName: string;
}

interface BreakdownResponse extends BreakdownRequest{
	error?: string | undefined;
	breakdown: NameValue[];
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
	reducers: {
		setBreakdownLoading: (state: EventSchemaState, action: PayloadAction<string>) => {
			state.breakdowns[action.payload] = { isLoading: true };
		}
	},
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
			})
			.addCase(getBreakdownBySchemaProperty.pending, (state: EventSchemaState) => {
				console.log('breakdowns pending');
				// state.breakdowns[action.payload.chartId] = {
				// 	isLoading: false,
				// 	breakdownData: action.payload.breakdown
				// };
			})
			.addCase(getBreakdownBySchemaProperty.fulfilled, (state: EventSchemaState,
															  action: PayloadAction<NameValue[]>) => {
				console.log('got breakdowns:', action.payload);
				// state.breakdowns[action.payload.chartId] = {
				// 	isLoading: false,
				// 	breakdownData: action.payload.breakdown
				// };
			})
			.addCase(getBreakdownBySchemaProperty.rejected, (state: EventSchemaState,
															  action) => {
				console.log(action, action.error.message);
				// state.breakdowns[action.payload.chartId] = {
				// 	isLoading: false,
				// 	error: action.error.message,
				// 	breakdownData: []
				// };
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
		const breakdown: NameValue[] = await new HttpClient().get(`/event-schema/
		${payload.eventSchemaId}/breakdown/${payload.schemaPropertyName}`);
		return breakdown;
	}
);

export default eventSchemaSlice.reducer;