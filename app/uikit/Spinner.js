import React from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {BLACK} from '../configs/style';

/**
 *
 * @param {boolean} animating
 * @param {string} color
 * @param {string|number} size
 * @param {number|Object|array} style
 */

function Spinner(props) {
  const {animating, color, style, size} = props;
  const chooseSize = size || 'large';
  const renderedSize = Platform.OS === 'ios' ? chooseSize : size;

  return (
    <ActivityIndicator
      animating={animating}
      color={color}
      size={renderedSize}
      style={style}
    />
  );
}

Spinner.propTypes = {
  animating: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
};

Spinner.defaultProps = {
  animating: true,
  color: BLACK,
  size: 'large',
};

export default Spinner;
