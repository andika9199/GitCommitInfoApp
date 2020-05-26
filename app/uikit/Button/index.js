import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {
  ITEMS_CENTER,
  DEFAULT_TEXT_BOLD,
  WHITE,
  BLACK,
  GRAY_LIGHT,
} from '../../configs/style';

const styles = StyleSheet.create({
  container: {
    ...ITEMS_CENTER,
    width: 150,
    height: 40,
    borderRadius: 4,
  },
  text: {
    ...DEFAULT_TEXT_BOLD,
    color: WHITE,
  },
  bgBlack: {
    backgroundColor: BLACK,
  },
  bgGray: {
    backgroundColor: GRAY_LIGHT,
  },
});

export default function Button(props) {
  const {disabled, onPress, style, title, titleStyle} = props;
  const bgColor = disabled ? styles.bgGray : styles.bgBlack;
  return (
    <TouchableOpacity
      style={[style, bgColor]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Button.defaultProps = {
  disabled: false,
  onPress: () => {},
  style: styles.container,
  title: 'Button',
  titleStyle: styles.text,
};
