import React, { Component } from 'react';
import { Text, Container, Left, Body, Right, Content, ListItem, List, Thumbnail, Badge, Header, Title, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
class EventScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null
  }
  render() {
    return(
      <Container>
        <Header>
          <Left> 
          </Left>
          <Body>
            <Title>
              Events
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.screenProps.rootNavigation.navigate('CreateEventScreen')}>
              <Icon name="add" style={{ color: Platform.OS === 'android' ? '#fff' : '#000' }}/>
            </Button>
          </Right>
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