import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import IEvent from "../../../models/event";

interface ModalState {
	isOpen: boolean;
	isLoading: boolean;
}

const initialState: ModalState = {
	isOpen: false,
	isLoading: false
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state: ModalState) => {
			state.isOpen = true;
		},
		closeModal: (state: ModalState) => {
			state.isOpen = false;
		}
	}
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;