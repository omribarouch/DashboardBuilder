import React, { useState } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useSelector } from 'react-redux';
import IChart from '../../../../models/chart.interface';
import AppChart from './chart/Chart';

const ReactGridLayout = WidthProvider(RGL);

const AppDashboardPage = () => {
  const charts: IChart[] = useSelector((state: any) => state.dashboards.charts)
  const [layout, setLayout] = useState<Layout[]>(
   charts.map(chart => ({i: chart.name, x: chart.x, y: chart.y, w: chart.width, h: chart.height}))
  );

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  return (
    <>
    <ReactGridLayout
      className="layout"
      layout={layout}
      cols={8}
      rowHeight={30}
      onLayoutChange={onLayoutChange}
      draggableHandle=".drag-handle"
    >
      {
         layout.map((panel, chartIndex) => (
            <div key={panel.i} className="panel drag-handle d-flex row p-1 m-1 border border-2 rounded" data-grid={panel}>
            <div className="text-center mb-2">{panel.i}</div>
            <AppChart chart={charts[chartIndex]} />
            </div>
         ))
      }
    </ReactGridLayout>
    </>
  );
};

export default AppDashboardPage;