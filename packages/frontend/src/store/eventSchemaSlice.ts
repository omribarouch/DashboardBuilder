import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import { RJSFSchema } from "@rjsf/utils";
import IEventSchema from "../models/event-schema.interface";

interface EventSchemaState {
	eventSchemas: RJSFSchema[];
	isLoading: boolean;
	errorMessage: string | undefined;
}

const initialState: EventSchemaState = {
	eventSchemas: [],
	isLoading: false,
	errorMessage: undefined
};

const eventSchemaSlice = createSlice({
	name: "eventSchema",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getEventSchemas.pending, (state: EventSchemaState) => {
			console.log('hartabuna pending');
			state.isLoading = true;
		});

		builder.addCase(getEventSchemas.fulfilled, (state: EventSchemaState, action: PayloadAction<IEventSchema[]>) => {
			console.log('hartabuna done', action.payload);
			state.isLoading = false;
			state.eventSchemas = action.payload;
		});

		builder.addCase(createEventSchema.fulfilled, (state: EventSchemaState, action: PayloadAction<IEventSchema>) => {
			state.eventSchemas.push(action.payload);
		});
	},
});

export const getEventSchemas = createAsyncThunk(
	"eventSchema/getEventSchemas",
	async () => {
		console.log('hartabuna');
		await new HttpClient().get('/event-schema');
		return [];
	}
);

export const createEventSchema = createAsyncThunk(
	"eventSchema/createEventSchema",
	async (payload: RJSFSchema) => {
		await new HttpClient().post('/event-schema', {
			name: 'geverrr',
			baseSchema: payload,
			uiSchema: {}
		});
		return payload;
	}
);

export default eventSchemaSlice.reducer;