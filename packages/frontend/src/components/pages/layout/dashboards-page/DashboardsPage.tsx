import * as React from 'react';
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getDashboards } from "../../../../store/dashboardSlice";
import { IDashboardPreview } from "../../../../models/dashboard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

const AppDashboardsPage = () => {
	const dashboards: IDashboardPreview[] = useSelector((state: RootState) =>
		state.dashboards.dashboardsPreviews);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getDashboards());
	}, [dispatch]);

	return (
		<div className="container py-4">
			<h1 className="text-center mb-4">Dashboards</h1>
			<button className="btn btn-primary mb-4">Create New Dashboard</button>
			<table className="table table-striped table-hover">
				<thead className="">
				<tr className="pointer">
					<th scope="col">#</th>
					<th scope="col">Name</th>
					<th scope="col">Description</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
				{
					dashboards.map((dashboardPreview: IDashboardPreview, index: number) =>
						<tr>
							<th scope="row">{ index + 1 }</th>
							<td>{ dashboardPreview.name }</td>
							<td>{ dashboardPreview.description }</td>
							<td>
								<Link to={`/dashboard/${dashboardPreview._id}`}>
									<button type="button" className="btn btn-outline-primary btn-sm rounded">
										<FontAwesomeIcon icon={faExternalLink} />
									</button>
								</Link>
							</td>
						</tr>
					)
				}
				</tbody>
			</table>
		</div>
	);
};

export default AppDashboardsPage;