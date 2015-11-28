import React from 'react';

import NavigatorItem from './NavigatorItem';

const Navigator = () => {
  return (
    <div
      style={ styles.base }
      className="fixed flex flex-center top-0 left-0 right-0 z4 p2">
      <NavigatorItem>
        Smoker.js
      </NavigatorItem>
    </div>
  );
};

const styles = {
  base: {
    backgroundColor: '#424242',
  },
};

export default Navigator;
