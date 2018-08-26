import React, { Component } from 'react';
import { Text, Container, Left, Body, Right, Content, ListItem, List, Thumbnail, Badge, Header, Title, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icons from './icons';
import { Platform, View, StatusBar, AsyncStorage } from 'react-native';

const LOGO = () => Icons.logo;

class EventScreen extends Component {
  constructor(props) {
    super(props);
  }

  unsaveUser = async ()=>{
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return(
      <Container>
        <Header style = {{ backgroundColor : 'rgb(73, 166, 232)', height : Platform.OS === 'android' ? 70 : 65, paddingTop : Platform.OS === 'android'? 8 : 20}}>
          <StatusBar
            backgroundColor="rgb(73, 150, 210)"
            translucent
            barStyle="light-content"/>
          <View style = {{ marginTop : Platform.OS === 'android' ? 25 : 10, flex : 1, flexDirection : 'row'}}>
            <Icon size ={25} style={{ color : '#fff'}} name='menu'/> 
            <Text style ={{ color : '#fff', fontSize : 23, textAlign: 'center', flex : 1}} onPress={this.unsaveUser}>
              Dock 
            </Text>  
            <Icon size ={25} style={{ color : '#fff'}} name='search'/>  
          </View>
        </Header>
        <Content>
          <List style={{marginTop: 10}}>
            <ListItem avatar button onPress={() => this.props.screenProps.rootNavigation.navigate('EventDetailScreen', {
              eventId: 'event id here',
              eventName: 'Sample Event Here',
              eventImageUrl: 'https://cdn-images-1.medium.com/max/1280/1*76KSie833sq6FAYtnbS7Ng.jpeg',
              DateCreated: new Date(),
              EventViews: '2',
            })} >
              <Left>
                <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
              </Left>
              <Body>
                <Text>Sample Event Here</Text>
                <Text note>Created on 16-10-2018</Text>
              </Body>
              <Right>
                <Badge info>
                  <Text>2</Text>
                </Badge>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

EventScreen.propTypes = {
  general: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { general: state.general };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
    
//   };
// };

export default connect(mapStateToProps)(EventScreen);