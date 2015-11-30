import React from 'react';

import ContentEditable from '../common/ContentEditable';

import ThresholdSetting from './ThresholdSetting';
import Reading from './Reading';
import Warning from './Warning';
import PercentageDonut from '../graphs/PercentageDonut';

const Gauge = (props) => {
  const {
    highThreshold,
    lowThreshold,
    measurement,
    onUpdateHighThreshold,
    onUpdateLowThreshold,
    onUpdateTitle,
    reading,
    title,
  } = props;

  return (
    <div>
      <div className="relative mb4 center">
        <PercentageDonut
          value={ ((reading - lowThreshold) / (highThreshold - lowThreshold)).toFixed(2) * 100 }
          width={ 300 }
          radius={ 4 }
          primaryColor={ reading < lowThreshold ? '#0074d9' : '#ff4136' }
          secondaryColor={ '#212121' } />

        <Reading
          measurement={ measurement }
          reading={ reading }>
          <ContentEditable
            onChange={ onUpdateTitle }
            html={ title } />
        </Reading>

        <ThresholdSetting
          className="left-0"
          value={ lowThreshold }
          onSave={ onUpdateLowThreshold }
          color="#0074d9"
          atThreshold={ reading < lowThreshold }>
          Low Temp
        </ThresholdSetting>

        <ThresholdSetting
          className="right-0"
          value={ highThreshold }
          onSave={ onUpdateHighThreshold }
          color="#ff4136"
          atThreshold={ reading > highThreshold }>
          High Temp
        </ThresholdSetting>
      </div>

      <Warning
        className="white bg-blue"
        isVisible={ reading < lowThreshold }>
        Low Warning
      </Warning>

      <Warning
        className="white bg-red"
        isVisible={ reading > highThreshold }>
        High Warning
      </Warning>
    </div>
  );
};

export default Gauge;
