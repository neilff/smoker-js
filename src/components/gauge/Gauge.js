import React from 'react';

import ContentEditable from '../ui/ContentEditable';
import SetThreshold from './SetThreshold';
import TemperatureReading from './TemperatureReading';
import TemperatureWarning from './TemperatureWarning';

const Gauge = (props) => {
  const {
    highThreshold,
    lowThreshold,
    measurement,
    onUpdateHighThreshold,
    onUpdateLowThreshold,
    onUpdateTitle,
    reading,
    sparklineData,
    title,
  } = props;

  return (
    <div>
      <TemperatureReading
        measurement={ measurement }
        reading={ reading }>
        <ContentEditable onChange={ onUpdateTitle } html={ title } />
      </TemperatureReading>

      <TemperatureWarning
        className="bg-blue white"
        showWarning={ reading < lowThreshold }>
        Low Warning
      </TemperatureWarning>

      <TemperatureWarning
        className="bg-red white"
        showWarning={ reading > highThreshold }>
        High Warning
      </TemperatureWarning>

      <div className="h6">Threshold High</div>
      <SetThreshold
        onSave={ onUpdateHighThreshold }
        value={ highThreshold } />

      <div className="h6">Threshold Low</div>
      <SetThreshold
        onSave={ onUpdateLowThreshold }
        value={ lowThreshold } />
    </div>
  );
}

export default Gauge;
