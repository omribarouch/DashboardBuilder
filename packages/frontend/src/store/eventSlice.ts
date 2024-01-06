import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import IEvent from "../models/event.interface";

interface EventState {
	isLoading: boolean;
}

const initialState: EventState = {
	isLoading: false
};

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createEvent.pending, (state: EventState) => {
				state.isLoading = true;
			})
			.addCase(createEvent.fulfilled, (state: EventState, action: PayloadAction<IEvent>) => {
				state.isLoading = false;
			});
	},
});

export const createEvent = createAsyncThunk(
	"event/createEvent",
	async (event: IEvent) => {
		const newEvent: IEvent = await new HttpClient().post('/event', event);
		return newEvent;
	}
);

export default eventSlice.reducer;