import React from 'react';
import baseStyles from '../../styles/base';

import NavigatorItem from './NavigatorItem';

const Navigator = () => {
  return (
    <div
      style={ styles.base }
      className="fixed flex flex-center flex-column top-0 bottom-0">
      <NavigatorItem>
        <i className="icon ion-speedometer" />
      </NavigatorItem>
      <NavigatorItem>
        <i className="icon ion-android-options" />
      </NavigatorItem>
    </div>
  );
};

const styles = {
  base: {
    backgroundColor: '#424242',
    width: '4rem',
  },
};

export default Navigator;
