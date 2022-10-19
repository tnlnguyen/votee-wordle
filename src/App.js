import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from 'Containers/Home/Home';
import Dashboard from 'Containers/Dashboard/Dashboard';
import { SCREEN } from 'Core/Utils/Screens';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={SCREEN.HOME} component={Home} exact />
        <Route path={SCREEN.DASHBOARD} component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
