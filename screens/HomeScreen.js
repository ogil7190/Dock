import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon, Container } from 'native-base';
import { Platform } from 'react-native';
import EventScreen from './EventScreen';
import ChannelScreen from './ChannelScreen';
import ProfileScreen from './ProfileScreen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const IconBottomNav = (name, tintColor) => <Icon name={name} style={{ color: tintColor }}/>;

const HomeScreenNav = createBottomTabNavigator(
  {
    EventScreen: { 
      screen: EventScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => IconBottomNav('pie', tintColor)
      }
    },
    ChannelScreen: { 
      screen: ChannelScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => IconBottomNav('microphone', tintColor)
      }
    },
    ProfileScreen: { 
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => IconBottomNav('person', tintColor)
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'blue',  // Color of tab when pressed
      inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
      showIcon: 'true', // Shows an icon for both iOS and Android
      showLabel: (Platform.OS !== 'android'), //No label for Android
      labelStyle: {
        fontSize: 11,
      },
    }
  }
);

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }
  
  state = {
    currentScreen: 'EventScreen'
  }
  render() {
    return(
      <Container>
        <HomeScreenNav screenProps={{ rootNavigation: this.props.navigation }} />
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { general: state.general };
};

export default connect(mapStateToProps) (HomeScreen);