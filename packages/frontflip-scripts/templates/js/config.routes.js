import React from 'react';
import {Route, Switch} from 'react-router';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from 'ui.pageViews/Home';

export default function App(props) {
  return (
    <Route render={({location})=>(
      <TransitionGroup className='routeWrapper'>
        <CSSTransition key={location.key} classNames='fade' timeout={500}>
          <Switch location={location}>
            <Route exact path='/' component={Home}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}/> 
  )
}