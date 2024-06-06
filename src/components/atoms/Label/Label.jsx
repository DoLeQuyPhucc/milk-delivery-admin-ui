import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

export const Label = ({ children, type, ...props }) => {
    return (
        <Typography.Text type={type} {...props}>
        {children}
        </Typography.Text>
    );
};