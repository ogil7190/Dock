import React, {Component} from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Root } from 'native-base';
import auth from './reducers/auth';
import general from './reducers/general';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import Login from './screens/Login';
import Main from './screens/Main';
import CreateEventScreen from './screens/CreateEventScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import UpdateEventScreen from './screens/UpdateEventScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import logger from 'redux-logger';

const store = createStore( combineReducers({ auth, general }), applyMiddleware(logger) );

const Screens = createStackNavigator({
  Login: { screen: Login},
  Main: { screen: Main },
  CreateEventScreen: { screen: CreateEventScreen },
  EventDetailScreen: { screen: EventDetailScreen },
  UpdateEventScreen: { screen: UpdateEventScreen },
  CreateProfileScreen : {screen : CreateProfileScreen}
});

export default class App extends Component {
  render() {
    
    return(
      <Provider store={store}>
        <Root>
          <Screens/>
        </Root>
      </Provider>
    );
  }
}