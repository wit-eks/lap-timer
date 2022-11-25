import React from 'react';
import Banners from './banners.svg';
import PropTypes from 'prop-types';

const LtBanner = ({ name, color, size }) => (
  <svg className={`banner banner-${name}`} fill={color} width={size}>
    <use xlinkHref={`${Banners}#banner-${name}`} />
  </svg>
);

LtBanner.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export default LtBanner;
