import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const Item = styled(Box)(({status}) => ({
  width: 50,
  height: 50,
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: status == null ? '#2979ff' : status === 'correct' ? '#52b202' : status === 'present' ? '#ffc400' : '#f50057',
  '&:hover': {
    backgroundColor: '#90caf9',
    opacity: [0.9, 0.8, 0.7],
  },
}));

export const Wrapper = styled(Box)({
  width: '50%',
  display: 'flex',
  justifyContent: 'space-between'
});

export const AnswerText = styled(Typography)(({shadow}) => ({
  textShadow: '0 0 6px black',
  cursor: 'pointer',
  color: shadow || 'transparent',
}));
