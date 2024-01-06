import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import IEventSchema from "../models/event-schema.interface";

interface EventSchemaState {
	eventSchemas: IEventSchema[];
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
			state.isLoading = true;
		});

		builder.addCase(getEventSchemas.fulfilled, (state: EventSchemaState, action: PayloadAction<IEventSchema[]>) => {
			state.isLoading = false;
			state.eventSchemas = action.payload;
		});

		builder.addCase(createEventSchema.fulfilled, (state: EventSchemaState, action: PayloadAction<any>) => {
			state.eventSchemas.push(action.payload);
		});
	},
});

export const getEventSchemas = createAsyncThunk(
	"eventSchema/getEventSchemas",
	async () => {
		const eventSchemas: IEventSchema[] = await new HttpClient().get('/event-schema');
		return eventSchemas;
	}
);

export const createEventSchema = createAsyncThunk(
	"eventSchema/createEventSchema",
	async (payload: IEventSchema) => {
		const newEventSchema: IEventSchema = await new HttpClient().post('/event-schema', {
			...payload
		});
		return newEventSchema;
	}
);

export default eventSchemaSlice.reducer;