import * as React from 'react';
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteDashboard, getDashboards } from "../../../../store/dashboardSlice";
import { IDashboardPreview } from "../../../../models/dashboard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../common/modal/Modal";
import CreateDashboardModal from "./create-dashboard-modal/CreateDashboardModal";
import { closeModal, openModal } from "../../../../store/modalSlice";

const AppDashboardsPage = () => {
	const dashboards: IDashboardPreview[] = useSelector((state: RootState) =>
		state.dashboards.dashboardsPreviews);
	const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getDashboards());
	}, [dispatch]);

	return (
		<div className="container card p-0">
			<div className="card-header">
				<h1 className="text-center">Dashboards</h1>
			</div>

			<div className="card-body">
				<div className="d-flex flex-row-reverse">
					<button className="btn btn-outline-primary rounded"
							onClick={() => dispatch(openModal())}>
						<FontAwesomeIcon icon={faPlus} className="me-1" />

						Create
					</button>
				</div>

				<Modal
					isOpen={isModalOpen}
					onClose={() => dispatch(closeModal())}
					title="Create Dashboard">
					<CreateDashboardModal />
				</Modal>

				{ dashboards.length > 0 ?
					<table className="table table-striped table-hover">
						<thead className="">
						<tr className="pointer">
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Description</th>
							<th scope="col">Creator</th>
							<th>Action</th>
						</tr>
						</thead>
						<tbody>
						{
							dashboards.map((dashboardPreview: IDashboardPreview, index: number) =>
								<tr key={dashboardPreview._id}>
									<th scope="row">{ index + 1 }</th>
									<td>{ dashboardPreview.name }</td>
									<td>{ dashboardPreview.description }</td>
									<td>{ dashboardPreview.creatorUsername }</td>
									<td>
										<div className="d-flex gap-2">
											<Link to={`/dashboard/${dashboardPreview._id}`}>
												<button className="btn btn-outline-primary rounded">
													<FontAwesomeIcon icon={faExternalLink} />
												</button>
											</Link>

											<button className="btn btn-outline-danger rounded"
													onClick={() => dispatch(deleteDashboard(dashboardPreview._id))}>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</div>
									</td>
								</tr>
							)
						}
						</tbody>
					</table> :
					<div className="text-center">Looks like you don't have any dashboards...</div>
				}
			</div>
		</div>
	);
};

export default AppDashboardsPage;