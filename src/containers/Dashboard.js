import React from 'react';

import Break from 'shared/components/ui/Break';
import GaugeList from 'modules/gauges/components/GaugeList';
import Row from 'shared/components/ui/Row';
import RecorderControls from 'modules/record/components/RecorderControls';
import Legend from 'modules/gauges/components/Legend';
import HeatGraph from 'modules/record/components/HeatGraph';

const Dashboard = () => {
  return (
    <div>
      <Row>
        <Break title="Temperature Gauges"/>
      </Row>

      <Row>
        <GaugeList />
      </Row>

      <Row>
        <Break title="Heat Graph"/>
      </Row>

      <Row>
        <HeatGraph
          min={ 0 }
          max={ 500 }
          height={ 480 }
          width={ 1024 } />
      </Row>

      <Row>
        <RecorderControls />
        <Legend />
      </Row>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';
Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;
