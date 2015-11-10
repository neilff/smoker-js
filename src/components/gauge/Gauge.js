import React from 'react';

import ContentEditable from '../ui/ContentEditable';
import Circle from '../ui/Circle';
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
      <div className="relative mb4">
        <TemperatureReading
          measurement={ measurement }
          reading={ reading }>
          <ContentEditable
            onChange={ onUpdateTitle }
            html={ title } />
        </TemperatureReading>

        <div
          style={ styles.thresholdSetting }
          className="absolute center bottom-0 left-0">
          <Circle
            width="0.5rem"
            color="#0074d9" />

          <div
            style={ styles.thresholdTitle }
            className="h6 gray">
            Low Temp
          </div>

          <SetThreshold
            style={ styles.input }
            onSave={ onUpdateLowThreshold }
            value={ lowThreshold } />
        </div>

        <div
          style={ styles.thresholdSetting }
          className="absolute center bottom-0 right-0">
          <Circle
            width="0.5rem"
            color="#ff4136" />

          <div
            style={ styles.thresholdTitle }
            className="h6 gray">
            High Temp
          </div>

          <SetThreshold
            style={ styles.input }
            onSave={ onUpdateHighThreshold }
            value={ highThreshold } />
        </div>
      </div>

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
    </div>
  );
}

const styles = {
  thresholdTitle: {
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  thresholdSetting: {
    width: '100px',
    bottom: '-45px',
  },
  input: {
    width: '100%',
    textAlign: 'center',
  }
}

export default Gauge;
