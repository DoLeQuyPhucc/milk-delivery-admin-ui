import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';

export const Button = ({ children, type, onClick, ...props }) => {
  return (
    <AntButton type={type} onClick={onClick} {...props}>
      {children}
    </AntButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'primary',
  style: {
    marginTop: '10px',
    backgroundColor: '#1890ff',
  },
  onClick: () => {},
};

export default Button;