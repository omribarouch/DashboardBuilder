import * as React from 'react';
import { useEffect, useState } from 'react';
import RGL from 'react-grid-layout';
import { Layout, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import AppChart from './chart/Chart';
import { AppDispatch, RootState } from "../../../../../store/store";
import { useParams } from "react-router-dom";
import { IDashboard } from "../../../../../models/dashboard";
import { getDashboard, saveDashboard } from "../../../../../store/dashboardSlice";
import { closeModal, openModal } from "../../../../../store/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../common/modal/Modal";
import CreateChartModal from "./create-chart-modal/CreateChartModal";

const ReactGridLayout = WidthProvider(RGL);

const AppDashboardPage = () => {
    const { id } = useParams();
    const currentDashboard: IDashboard | undefined = useSelector((state: RootState) =>
        state.dashboards.dashboards.find(dashboard => dashboard._id === id));
    const [layout, setLayout] = useState<Layout[]>([]);
    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!currentDashboard) {
            dispatch(getDashboard(id));
        } else {
            setLayout(currentDashboard.charts.map(chart =>
                ({
                    i: chart.description,
                    x: chart.x,
                    y: chart.y,
                    w: chart.width,
                    h: chart.height
                })
            ));
        }
    }, [currentDashboard]);

    const onLayoutChange = (newLayout: Layout[]) => {
        setLayout(newLayout);
    };

    return (
        <>
            {
                currentDashboard &&
                <div className="container card p-0">
                    <div className="card-header">
                        <h2>{ currentDashboard.name }</h2>

                        <small>{ currentDashboard.description }</small>
                    </div>

                    <div className="card-body">
                        <div className="d-flex flex-row-reverse gap-2">
                            <button className="btn btn-outline-primary rounded"
                                    onClick={() => dispatch(openModal())}>
                                <FontAwesomeIcon icon={faPlus} className="me-1" />

                                Add Chart
                            </button>

                            <button className="btn btn-outline-primary rounded"
                                    onClick={() => dispatch(saveDashboard(currentDashboard))}>
                                <FontAwesomeIcon icon={faSave} className="me-1" />

                                Save
                            </button>
                        </div>

                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => dispatch(closeModal())}
                            title="Create Chart">
                            <CreateChartModal currentDashboard={currentDashboard} />
                        </Modal>

                        <ReactGridLayout
                            className="layout"
                            layout={ layout }
                            cols={ 8 }
                            rowHeight={ 30 }
                            onLayoutChange={ onLayoutChange }
                            draggableHandle=".drag-handle">
                            {
                                layout.map((panel, chartIndex) => (
                                    <div key={ currentDashboard.charts[chartIndex]._id }
                                         className="panel drag-handle d-flex row p-1 m-1 border border-2 rounded"
                                         data-grid={ panel }>
                                        <AppChart chart={ currentDashboard.charts[chartIndex] }/>
                                    </div>
                                ))
                            }
                        </ReactGridLayout>
                    </div>
                </div>
            }
        </>
    );
};

export default AppDashboardPage;