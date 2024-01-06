import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import IEvent from "../../../models/event";

interface EventState {
	isLoading: boolean;
	error: string | undefined;
}

const initialState: EventState = {
	isLoading: false,
	error: undefined
};

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createEvent.pending, (state: EventState) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(createEvent.fulfilled, (state: EventState, action: PayloadAction<IEvent>) => {
				state.isLoading = false;
			})
			.addCase(createEvent.rejected, (state: EventState, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const createEvent = createAsyncThunk(
	"event/createEvent",
	async (event: IEvent) => {
		console.log('event', event);
		const newEvent: IEvent = await new HttpClient().post('/event', event);
		return newEvent;
	}
);

export default eventSlice.reducer;