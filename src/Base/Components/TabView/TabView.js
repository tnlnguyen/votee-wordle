import * as React from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabPanel from './components/TabPanel/TabPanel';
import Board from '../Board/Board';
import { Mode } from 'Core/Utils/Enum';

export const TabView = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Guess Daily" {...a11yProps(0)} />
            <Tab label="Guess Random" {...a11yProps(1)} />
            <Tab label="Guess Word" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Board mode={Mode.DAILY} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Board mode={Mode.RANDOM} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Board mode={Mode.WORD} />
        </TabPanel>
      </Box>
    </>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
