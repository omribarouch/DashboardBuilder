import * as React from "react";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createDashboard } from "../../../../../store/dashboardSlice";
import { closeModal } from "../../../../../store/modalSlice";

const CreateDashboardModal = () => {
	const isLoading: boolean = useSelector((state: RootState) => state.dashboards.isLoading);
	const errorMessage: string | undefined = useSelector((state: RootState) => state.dashboards.errorMessage);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const dispatch: AppDispatch = useDispatch();

	return (
		<div className="container d-flex row gap-3">
			<div className="form-group">
				<label htmlFor="name">Dashboard Name</label>

				<input
					type="text"
					className="form-control"
					id="name"
					placeholder="Enter dashboard name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="description">Description</label>

				<input
					type="text"
					className="form-control"
					id="description"
					placeholder="Enter dashboard description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<button className="btn btn-primary btn-block"
					disabled={ isLoading }
					onClick={() => {
						dispatch(createDashboard({ name, description }));
						dispatch(closeModal());
					}}>
				{
					isLoading &&
					<span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
				}
				Create
			</button>
			{
				errorMessage &&
				<span className="text-danger">{ errorMessage }</span>
			}
		</div>
	);
}

export default CreateDashboardModal;