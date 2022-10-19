import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import Input from 'Base/Components/Input/Input';
import VoteeButton from 'Base/Components/Button/Button';
import { useAppDispatch } from 'Store/Hook';
import { setUser } from 'Store/Features/Auth/AuthSlice';
import { useHistory } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onNameChange = (value) => {
    setName(value?.target?.value);
    dispatch(setUser(value?.target?.value))
  };

  const gotoBoard = () => {
    history.push('/dashboard')
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            id="outlined-basic"
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={onNameChange}
          />
          <VoteeButton variant="outlined" text="Go To Board" onClick={gotoBoard} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
