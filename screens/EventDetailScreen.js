import React, { Component } from 'react';
import { Animated, Image, ScrollView, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Container, Button, Icon, Fab, Grid, Col, Row } from 'native-base';

// For animations
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 70;

class EventDetailScreen extends Component {

  static navigationOptions = {
    header: null
  };

  state={
    scrollY: new Animated.Value(0),
    eventDate: '20-1-2018',
    registrationDate: '12-1-2018 to 18-1-2018',
    location: 'Manav Rachna International University',
    eventReach: 475,
    eventClicks: 255,
  }
  
  render() {
    const { navigation } = this.props;
    const eventId = navigation.getParam('eventId', 'NO-ID');
    const eventName = navigation.getParam('eventName', 'Please Wait');
    const eventImageUrl = navigation.getParam('eventImageUrl', 'https://facebook.github.io/react-native/docs/assets/favicon.png');
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT-HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const imageOffset = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT-HEADER_MIN_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    const eventNameOffset = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT-HEADER_MIN_HEIGHT + 10 ,HEADER_MAX_HEIGHT-HEADER_MIN_HEIGHT + 10 + 25],
      outputRange: [-20, -20, HEADER_MIN_HEIGHT/2 - 10],
      extrapolate: 'clamp'
    });
    StatusBar.setBarStyle('light-content', true);
    return(
      <Container>
        <Animated.View style={{ 
          position: 'absolute',  
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#1b75bc',
          height: headerHeight,
          zIndex: 1
        }}>
          
          <Animated.View style={{ position: 'absolute', opacity: imageOffset, width: '100%', height: '100%' }}>
            <Image source={{uri: eventImageUrl}}
              style={{ width: '100%', height: '100%', resizeMode: 'cover'}} />
          </Animated.View>
          <Animated.View style={{ position: 'absolute', bottom: eventNameOffset, left: 0, right: 0, alignItems: 'center'}}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{eventName}</Text>
          </Animated.View>
          
          <View 
            style={{
              position: 'absolute',
              top: 10,
              left: 5,
            }}
          >
            <Button transparent onPress={() => { StatusBar.setBarStyle('default', true); this.props.navigation.navigate('HomeScreen'); }}>
              <Icon name="arrow-back" style={{ color: '#fff', fontSize: 35 }} />
            </Button>
          </View>
        </Animated.View>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}
        >
          <Animated.View style={{
            marginTop: HEADER_MAX_HEIGHT + 10,
            marginLeft: 10
          }}>
            <Text style={{ fontSize: 25, textAlign: 'left', fontWeight: 'bold'}}>{eventName}</Text>
          </Animated.View>      



          <Grid style={{ marginLeft: 10, marginRight: 10 }}>
            <Row style={{ marginTop: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='calendar' style={{ marginLeft: 10, marginRight: 10 }}/>
                <Text>{this.state.eventDate}</Text>
              </View>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='person-add' style={{ marginLeft: 10, marginRight: 10 }}/>
                <Text>{this.state.registrationDate}</Text>
              </View>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='pin' style={{ marginLeft: 10, marginRight: 10 }}/>
                <Text>{this.state.location}</Text>
              </View>
            </Row>
            <Row style={{ marginTop: 15 }}>
              <Button style={{flex: 1, padding: 10}} iconLeft iconRight transparent primary bordered>
                <Icon name='people' />
                <Text>300+ Registrations</Text>
                <Icon name='arrow-forward' />
              </Button>
            </Row>
            <Row style={{ marginTop: 15 }}>
              <Button disabled style={{flex: 1, padding: 10 }} iconLeft iconRight transparent success bordered>
                <Icon name='megaphone' />
                <Text>Promotion</Text>
                <Icon name='arrow-forward' />
              </Button>
            </Row>
            <Row style={{ marginTop: 15 }}>
              <Col>
                <View style={{ height: 100, borderRadius: 6, backgroundColor: '#364f6b', margin: 10, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, color: '#fff'}}>{this.state.eventReach} reach</Text>
                </View>
              </Col>
              
              <Col>
                <View style={{ height: 100, borderRadius: 6, backgroundColor: '#53d397', margin: 10, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, color: '#fff'}}>{this.state.eventClicks} clicks</Text>
                </View>
              </Col>
              
              
            </Row>
            
          </Grid>
          

        </ScrollView>
        <Fab
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: 'red' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="create" />
          <Button style={{ backgroundColor: '#3B5998' }} onPress={() => this.props.navigation.navigate('UpdateEventScreen', { eventId })} >
            <Icon name="options" />
          </Button>
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="cash" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

EventDetailScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default EventDetailScreen;