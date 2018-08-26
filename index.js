/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
//import bgMssg from './bgMssg';

AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMssg);
