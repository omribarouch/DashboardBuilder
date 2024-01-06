import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HttpClient from "../utils/httpClient";
import { IDashboard, IDashboardPreview } from "../../../models/dashboard";
import ChartType from "../models/chartType";

interface DashboardState {
	dashboardsPreviews: IDashboardPreview[];
	dashboards: IDashboard[];
	isLoading: boolean;
}

const initialState: DashboardState = {
	dashboardsPreviews: [],
	dashboards: [],
	isLoading: false
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		createChart: (state: DashboardState, action: PayloadAction<string>) => {
			const currentDashboard: IDashboard = state.dashboards.find(dashboard => dashboard._id === action.payload);
			if (!currentDashboard) {
				return;
			}

			currentDashboard.charts.push({
				x: Infinity,
				y: Infinity,
				width: 4,
				height: 4,
				type: ChartType.Bar,
				eventSchemaId: undefined,
				schemaPropertyName: undefined
			});
		},
		deleteChart: (state: DashboardState, action: PayloadAction<string>) => {

		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDashboards.pending, (state: DashboardState) => {
				state.isLoading = true;
			})
			.addCase(getDashboards.fulfilled, (state: DashboardState,
											   action: PayloadAction<IDashboardPreview[]>) => {
				state.isLoading = false;
				state.dashboardsPreviews = action.payload;
			})
			.addCase(getDashboard.pending, (state: DashboardState) => {
				state.isLoading = true;
			})
			.addCase(getDashboard.fulfilled, (state: DashboardState,
											  action: PayloadAction<IDashboard>) => {
				state.isLoading = false;
				state.dashboards.push(action.payload);
			})
			.addCase(createDashboard.pending, (state: DashboardState) => {
				state.isLoading = true;
			})
			.addCase(createDashboard.fulfilled, (state: DashboardState,
											  action: PayloadAction<IDashboardPreview>) => {
				state.isLoading = false;
				state.dashboardsPreviews.push(action.payload);
			})
			.addCase(saveDashboard.pending, (state: DashboardState) => {
				state.isLoading = true;
			})
			.addCase(saveDashboard.fulfilled, (state: DashboardState,
											   action: PayloadAction<IDashboard>) => {
				state.isLoading = false;

				const previewIndex: number = state.dashboardsPreviews
					.findIndex(dashboardPreview => dashboardPreview._id === action.payload._id);
				if (previewIndex >= 0) {
					state.dashboardsPreviews[previewIndex] = action.payload as IDashboardPreview;
				}

				const dashboardIndex: number = state.dashboards
					.findIndex(dashboard => dashboard._id === action.payload._id);
				if (dashboardIndex >= 0) {
					state.dashboards[previewIndex] = action.payload;
				}
			})
			.addCase(deleteDashboard.pending, (state: DashboardState) => {
				state.isLoading = true;
			})
			.addCase(deleteDashboard.fulfilled, (state: DashboardState,
											   action: PayloadAction<IDashboard>) => {
				state.isLoading = false;
				state.dashboardsPreviews = state.dashboardsPreviews
					.filter(dashboardPreview => dashboardPreview._id !== action.payload._id);

				state.dashboards = state.dashboards.filter(dashboard =>
					dashboard._id !== action.payload._id);
			});
	},
});

export const getDashboards = createAsyncThunk(
	"dashboard/getDashboards",
	async () => {
		const dashboards: IDashboardPreview[] = await new HttpClient().get('/dashboard');
		return dashboards;
	}
);

export const createDashboard = createAsyncThunk(
	"dashboard/createDashboard",
	async (payload: { name: string, description: string }) => {
		console.log(
			payload
		)
		const newDashboard: IDashboardPreview = await new HttpClient().post('/dashboard', {
			name: payload.name,
			description: payload.description
		});
		return newDashboard;
	}
);

export const getDashboard = createAsyncThunk(
	"dashboard/getDashboard",
	async (dashboardId: string) => {
		const dashboard: IDashboard = await new HttpClient().get(`/dashboard/${ dashboardId }`);
		return dashboard;
	}
);

export const saveDashboard = createAsyncThunk(
	"dashboard/saveDashboard",
	async (payload: IDashboard) => {
		// const updatedDashboard: IDashboard = await new HttpClient().put(`/dashboard/${payload._id}`, {
		// 	...payload
		// });
		console.log('saving:', payload);
		return payload;
	}
);

export const deleteDashboard = createAsyncThunk(
	"dashboard/deleteDashboard",
	async (dashboardId: string) => {
		const deletedDashboard: IDashboard = await new HttpClient().delete(`/dashboard/${dashboardId}`);
		return deletedDashboard;
	}
);

export const { createChart, deleteChart } = dashboardSlice.actions;

export default dashboardSlice.reducer;