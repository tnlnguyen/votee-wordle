import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { getUser } from 'Store/Features/Auth/AuthSelector';
import { useAppSelector } from 'Store/Hook';

import { Container } from './styles';
import { TabView } from 'Base/Components/TabView/TabView';
import { Typography } from '@mui/material';
import Auth from 'Core/Messages/Auth';

const Dashboard = () => {
  const { formatMessage } = useIntl();
  const user = useAppSelector(getUser);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {`${formatMessage(Auth.title)} ${user}`}
      </Typography>
      <TabView />
    </Container>
  );
};

export default Dashboard;
