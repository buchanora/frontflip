import { createStore, compose } from 'redux';
import rootReducer from './reducer';

export default function configureStore(enhancers){
  var store;
  if (enhancers){
    store = createStore(rootReducer, undefined, compose(...enhancers));
  } else {
    store = createStore(rootReducer);
  }

  if(module.hot){
    module.hot.accept(()=>{
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
