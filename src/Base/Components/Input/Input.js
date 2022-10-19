import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ mode, label, variant, style, ...props }) => {
  return <TextField id={mode} label={label} variant={variant} {...style} {...props}/>;
};

export default Input;
