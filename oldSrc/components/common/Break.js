import React, { PropTypes } from 'react';

const Break = ({ title }) => {
  return (
    <div className="relative mt3 mb2 mr1 ml1" style={ styles.base }>
      <div className="absolute" style={ styles.line }></div>
      {
        title ? <h3 className="relative z2 silver" style={ styles.title }>{ title }</h3> : null
      }
    </div>
  );
};

Break.displayName = 'Break';
Break.propTypes = {
  title: PropTypes.string,
};
Break.defaultProps = {};

const styles = {
  base: {
    width: '100%',
  },
  line: {
    top: '50%',
    width: '100%',
    height: '1px',
    backgroundColor: '#424242',
  },
  title: {
    display: 'inline-block',
    paddingRight: '1rem',
    verticalAlign: 'middle',
    backgroundColor: '#212121',
    fontSize: '0.75rem',
    fontWeight: '100',
    marginTop: '0',
    marginBottom: '0',
    textTransform: 'uppercase',
  },
};

export default Break;
