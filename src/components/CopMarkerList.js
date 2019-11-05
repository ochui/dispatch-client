import React from 'react';
import PropTypes from 'prop-types';

import CopMarker from './CopMarker';

const CopMarkerList = cops => {
  const copList = cops.cops.map(cop => {
    const { lat, lng, name } = cop;
    return <CopMarker key={Math.random()} lat={lat} lng={lng} name={name} />;
  });
  return copList;
};

CopMarkerList.propTypes = {
  // required
  //   image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cops: PropTypes.array.isRequired
};

export default CopMarkerList;
