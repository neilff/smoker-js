import React, { PropTypes } from 'react';

import ContentEditable from '../common/ContentEditable';

import ThresholdSetting from './ThresholdSetting';
import Reading from './Reading';
import Warning from './Warning';
import GaugeMenu from './GaugeMenu';
import PercentageDonut from '../graphs/PercentageDonut';

const Gauge = (props) => {
  const {
    color,
    highThreshold,
    lowThreshold,
    measurement,
    menuVisible,
    onColorChange,
    onUpdateHighThreshold,
    onUpdateLowThreshold,
    onUpdateTitle,
    reading,
    title,
    toggleMenu,
  } = props;

  return (
    <div>
      <div className="relative mb4 center">
        <GaugeMenu
          color={ color }
          onColorChange={ onColorChange }
          toggleMenu={ toggleMenu }
          isVisible={ menuVisible } />

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

Gauge.displayName = 'Gauge';
Gauge.propTypes = {
  color: PropTypes.string.isRequired,
  highThreshold: PropTypes.string.isRequired,
  lowThreshold: PropTypes.string.isRequired,
  measurement: PropTypes.string.isRequired,
  menuVisible: PropTypes.bool.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onUpdateHighThreshold: PropTypes.func.isRequired,
  onUpdateLowThreshold: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
  reading: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
Gauge.defaultProps = {};

export default Gauge;
