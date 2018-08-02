import React, { Component } from 'react';
import {StyleSheet, Platform, StatusBar, View, Image} from 'react-native';
import { Text, Button } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
import PropTypes from 'prop-types';
import { AUTH_USER } from '../constants';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icons from './icons';
import {LoginManager, AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

const Logo_white = () => Icons.logo_white;
const Icon_inst = () => Icons.icon_inst;
const Icon_student = () => Icons.icon_student;
const Icon_trophy = () => Icons.icon_trophy;
const Icon_book = () => Icons.icon_book;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null,
    };
  }

  static navigationOptions = {
    header: null,
  };

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
      console.log(user);
    } catch (error) {
      this.setState({
        error,
      });
    }
  }
  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result);
      alert('Success fetching data: ' + result.toString());
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

  _fbLogin = () =>{
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString());
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log(data);
              console.log(result);
              const infoRequest = new GraphRequest('/me', {
                accessToken: data.accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,last_name'
                  }
                }
              }, this._responseInfoCallback);

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            }
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      }
    );
  }

  render() {
    return(
      <LinearGradient colors={['#1F1F5C', '#1CB5E0']} 
        style={styles.mainContainer}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent
          barStyle="light-content"/>
        <Text style = {styles.title}>Hi there,{'\n'}Welcome to Dock!</Text>
        <View style={styles.icon_container}>
          <View style={styles.icon}>
            <Icon_student />
          </View>
          <View style={styles.icon}>
            <Icon_inst />
          </View>
          <View style={styles.icon}>
            <Logo_white />
          </View>
          <View style={styles.icon}>
            <Icon_trophy />
          </View>
          <View style={styles.icon}>
            <Icon_book />
          </View>
        </View>
        <Text style = {styles.slogan}>Knowledge is power, Information is liberating.</Text>
        <View style = {styles.action_container}>
          <Button light 
            style={styles._button} 
            onPress={this._signIn}>
            <Image
              style = {{ marginLeft : 10, width: 32, height: 32}}
              source={require('./images/google.png')}/>
            <Text style={styles.btn_style}>Continue with Google</Text>
          </Button>
        </View>
        <View style = {styles.action_container}>
          <Button light style={styles._button} onPress={this._fbLogin}>
            <Image
              style = {{ marginLeft : 10, width: 32, height: 32}}
              source={require('./images/facebook.png')}/>
            <Text textAlign="center" style={styles.btn_style}>Continue with Facebook</Text>
          </Button>
        </View>
        <Text style={styles.help_text}>Need Any Help?</Text>
      </LinearGradient>);
    
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  icon_container : {
    justifyContent:'center', 
    alignItems: 'center', 
    marginTop: 30, 
    flexDirection : 'row'
  },
  icon:{
    marginLeft:10, 
    marginRight:10
  },
  title :{
    color : '#ffffff',
    marginTop : 50,
    fontSize: 30 
  },
  slogan :{
    color : '#ffffff',
    justifyContent :'center',
    alignItems : 'center',
    textAlign : 'center',
    marginTop : 25,
    marginBottom : 25,
    fontSize: 15
  },
  help_text :{
    color : '#dfdfdf',
    justifyContent :'center',
    alignItems : 'center',
    textAlign : 'center',
    marginTop : 10,
    fontSize: 15
  },
  _button : {
    height: 50,
    width: '100%',
  },
  action_container : {
    marginTop : 20,
    width: '100%',
    paddingLeft : 20,
    paddingRight: 20
  },
  btn_style: {
    flex: 1,
    paddingLeft : 30,
    paddingRight: 30
  }
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
