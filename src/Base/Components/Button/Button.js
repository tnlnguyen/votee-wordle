import React from 'react';
import Button from '@mui/material/Button';

const VoteeButton = ({ variant, style, text, ...props }) => {
  return (
    <Button variant={variant} {...style} {...props}>
      {text}
    </Button>
  );
};

export default VoteeButton;
