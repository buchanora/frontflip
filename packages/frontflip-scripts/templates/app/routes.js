import React from 'react';
import { Route, Switch } from 'react-router';

import Sample from './views__pages__site/Sample/';

export default function App (props){
  return(
    <Switch>
      <Route path='/' component={Sample} exact/>
    </Switch>
  );
}
