import React, {  Component } from 'react';
import { Container, Button, Text, Item, Input, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { AUTH_USER } from '../constants';
import PropTypes from 'prop-types';
import { NavigationActions, StackActions } from 'react-navigation';


const Login = class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginRequest = this.handleLoginRequest.bind(this);
  }
  state = {
    email: '',
    password: '',
    loading: true
  }
  static navigationOptions = {
    header: null
  }



  componentDidMount() {
    this.token_check();
  }

  checkEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  login_handler = async (response) => {
    try {
      await AsyncStorage.setItem('token', response.data.token);
      this.props.login_success(response.data.token);
      const navigation = this.props.navigation;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
      });
      navigation.dispatch(resetAction);
      // navigation.navigate('HomeScreen');
    } catch (error) {
      // Error saving data
    }
  };
  
  token_check = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      axios.post('https://mycampusdock.com/auth/android/manager/verify', { }, { headers: {'x-access-token': token } })
        .then(response => {
          if(!response.data.error) {
            console.log('token check success');
            console.log(response);
            this.login_handler(response);
          } 
        }).catch(() => {
          this.setState({
            loading: false
          });
        });
    } catch (error) {
      this.setState({
        loading: false
      });
    }
    this.setState({
      loading: false
    });
  };

  handleLoginRequest = () => {
    console.log(this.state.email, this.state.password);
    // this.props.login_success();
    this.setState({ loading: true });
    axios.post('https://mycampusdock.com/auth/android/manager/signin', { email: this.state.email, password: this.state.password })
      .then(response => {
        if(!response.data.error) {
          console.log(response);
          this.login_handler(response);
        } else {
          // style when wrong details entered
        }
      }).catch((err) => {
        console.log(err);
      }).then(() => {
        this.setState({
          loading: false
        });
      });
  };
  handleChangeEmail = (email) => {
    this.setState({email: email+''.trim()});
  }
  handleChangePassword = (password) => {
    this.setState({password: password+''.trim()});
  }
  render() {
    const emailValid = this.checkEmail(this.state.email);
    return (
      <Container style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20 }}>
        <Item success={emailValid}>
          <Input maxLength={254} autoCapitalize='none' disabled={this.state.loading} value={this.state.email} onChangeText={this.handleChangeEmail} placeholder='Enter email address'/>
          <Icon name='checkmark-circle' />
        </Item>
        <Item>
          <Input maxLength={254} autoCapitalize='none' value={this.state.password} onChangeText={this.handleChangePassword} secureTextEntry={true} disabled={!emailValid || this.state.loading} placeholder='Enter password here'/>
        </Item>
        <Button disabled={!emailValid || this.state.loading} style={{ alignSelf: 'center', marginTop: 20 }} onPress={this.handleLoginRequest} >
          <Text>
              Submit
          </Text>
        </Button>
        <Spinner animating={this.state.loading} />
      </Container>
    );
  }
};

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
