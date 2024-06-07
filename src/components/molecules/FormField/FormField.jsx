import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';

export const FormField = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <Input {...props} />
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;