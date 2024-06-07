import React from 'react';
import { Button } from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField/FormField';

export const LoginForm = () => (
  <form>
    <FormField label="Username" />
    <FormField label="Password" type="password" />
    <Button type="submit">Login</Button>
  </form>
);

export default LoginForm;