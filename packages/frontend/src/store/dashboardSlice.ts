import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import { IDashboard, IDashboardPreview } from "../models/dashboard";

interface DashboardState {
	dashboardsPreviews: Map<string, IDashboardPreview>;
	dashboards: Map<string, IDashboard>;
	isLoading: boolean;
}

const initialState: DashboardState = {
	dashboardsPreviews: new Map<string, IDashboardPreview>(),
	dashboards: new Map<string, IDashboard>(),
	isLoading: false
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDashboards.pending, (state: DashboardState) => {
				state.isLoading = true;
			})
			.addCase(getDashboards.fulfilled,
				(state: DashboardState, action: PayloadAction<IDashboardPreview[]>) => {
					state.isLoading = false;
					state.dashboardsPreviews = new Map<string, IDashboardPreview>(action.payload
						.map(dashboardPreview => [dashboardPreview._id, dashboardPreview]));
				})
			.addCase(getDashboard.pending, (state: DashboardState) => {
				state.isLoading = true;
			})
			.addCase(getDashboard.fulfilled,
				(state: DashboardState, action: PayloadAction<IDashboard>) => {
					state.isLoading = false;
					state.dashboards.set(action.payload._id, action.payload);
				})
			.addCase(saveDashboard.pending, (state: DashboardState) => {
				state.isLoading = true;
			})
			.addCase(saveDashboard.fulfilled,
				(state: DashboardState, action: PayloadAction<IDashboard>) => {
					state.isLoading = false;
					state.dashboardsPreviews[action.payload._id] = action.payload as IDashboardPreview;
					state.dashboards[action.payload._id] = action.payload;
				})
	},
});

export const getDashboards = createAsyncThunk(
	"dashboard/getDashboards",
	async () => {
		const dashboards: IDashboard[] = await new HttpClient().get('/dashboard');
		return dashboards;
	}
);

export const getDashboard = createAsyncThunk(
	"dashboard/getDashboard",
	async (dashboardId: string) => {
		const dashboard: IDashboard = await new HttpClient().get(`/dashboard/${dashboardId}`);
		return dashboard;
	}
);

export const saveDashboard = createAsyncThunk(
	"dashboard/saveDashboard",
	async (payload: IDashboard) => {
		const updatedDashboard: IDashboard = await new HttpClient().put(`/dashboard/${payload._id}`, {
			...payload
		});
		return updatedDashboard;
	}
);

export default dashboardSlice.reducer;