import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon, Container } from 'native-base';
import { View, StatusBar } from 'react-native';
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
        title: 'Home',
        tabBarIcon: ({ tintColor }) => IconBottomNav('home', tintColor)
      }
    },
    ChannelScreen: { 
      screen: ChannelScreen,
      navigationOptions: {
        title: 'Channels',
        tabBarIcon: ({ tintColor }) => IconBottomNav('flame', tintColor)
      }
    },
    ProfileScreen: { 
      screen: ProfileScreen,
      navigationOptions: {
        title: 'History',
        tabBarIcon: ({ tintColor }) => IconBottomNav('bookmarks', tintColor)
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgb(73, 166, 280)',  // Color of tab when pressed
      inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
      showIcon: 'true', // Shows an icon for both iOS and Android
      showLabel : true, //No label for Android
      labelStyle: {
        fontSize: 11,
      },
      elevation : 90
    }
  }
);

class HomeScreen extends Component {
  state = {
    currentScreen: 'EventScreen'
  }

  static navigationOptions = {
    header: null,
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