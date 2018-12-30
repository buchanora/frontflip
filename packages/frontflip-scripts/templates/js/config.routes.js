import React from 'react';
import {Route, Switch} from 'react-router';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from 'pages/Login';
import Login from 'pages/Home';


export default function App(props) {
  return (
    <Route render={({location})=>(
      <TransitionGroup className='routeWrapper'>
        <CSSTransition key={location.key} classNames='fade' timeout={500}>
          <Switch location={location}>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}/>
    
  );
}