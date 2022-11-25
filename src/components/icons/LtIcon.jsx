import React from 'react';
import MountainsIcons from './mountains.svg';
import PropTypes from 'prop-types';

const LtIcon = ({ name, color, size }) => (
  <svg className={`button-icon icon icon-${name}`} fill={color} width={size} height={size}>
    <use xlinkHref={`${MountainsIcons}#icon-${name}`} />
  </svg>
);

LtIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export default LtIcon;
