import React from 'react';
import PropTypes from 'prop-types';
import { Input as AntInput } from 'antd';

export const Input = ({ value, onChange, style, ...props }) => {
  return (
    <AntInput value={value} onChange={onChange} style={style} {...props} />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

Input.defaultProps = {
  onChange: () => {},
  style: {},
};

export default Input;