import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import config from './config';
import PropTypes from 'prop-types';
import { AUTH_USER } from '../constants';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null,
    };
  }

  async componentDidMount() {
    await this._configureGoogleSignIn();
    await this._getCurrentUser();
  }

  async _configureGoogleSignIn() {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId: '7449865696-ae0o9lcpdto2iq2jmq1dt52l9q3pikdp.apps.googleusercontent.com',
        },
        android: {},
      }),
    };

    await GoogleSignin.configure({
      ...configPlatform,
      webClientId: '',
      offlineAccess: false,
    });
  }

  async _getCurrentUser() {
    try {
      const user = await GoogleSignin.currentUserAsync();
      this.setState({ user, error: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  }

  render() {
    const { user, error } = this.state;
    if (!user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._signIn}
          />
          {error && (
            <Text>
              {error.toString()} code: {error.code}
            </Text>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
            Welcome {user.name}
          </Text>
          <Text>Your email is: {user.email}</Text>

          <TouchableOpacity onPress={this._signOut}>
            <View style={{ marginTop: 50 }}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _signIn = async () => {
    try {
      const user = await GoogleSignin.signIn();
      this.setState({ user, error: null });
      console.log(user);
    } catch (error) {
      if (error.code === 'CANCELED') {
        error.message = 'user canceled the login flow';
      }
      this.setState({
        error,
      });
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

Login.propTypes = {
  login_success: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login_success: () => {
      dispatch({ type: AUTH_USER });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
