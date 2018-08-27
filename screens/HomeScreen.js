import React, { Component } from 'react';
import { Text, Container, Left, Body, Right, Content, ListItem, List, Thumbnail, Badge, Header, Title, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icons from './icons';
import { Platform, View, StatusBar, AsyncStorage, FlatList } from 'react-native';
import FlatCardChannel from './components/FlatCardChannel';
import FlatCard from './components/FlatCard';

class HomeScreen extends Component {
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
          <Text style={{fontSize : 15, marginLeft : 12, marginTop : 5}}>
            Channel Updates
            <Text  style={{color : 'red', fontSize : 20}}> • </Text>
          </Text>
          <FlatList
            data={[{ image : 'https://static1.squarespace.com/static/52bcb171e4b0207b1fe5f639/58627b46bebafb6533b0da67/5873f30315d5db147f3bd03a/1483993868090/Website+Background.png?format=2500w', title : 'MKBHD Pixel 3 Unboxing 2018', channel : 'MKBHD', data : 'Something', url : 'Something'},
            { image : 'https://1.bp.blogspot.com/-AOh_vBqtgQE/Wx-uUmRbeAI/AAAAAAAAxDY/s9eoWuunEnUP3Jo92Be4xOqoVm7Mcr9EwCLcBGAs/s728-e100/android-adb-hack.png', title : 'Everything about Android Pie', channel : 'Google Android', data : 'Something', url : 'Something'}]}
            horizontal = {true}
            style = {{marginLeft : 10}}
            key = {0}
            showsHorizontalScrollIndicator = {false}
            renderItem={({item}) => <FlatCardChannel key={item.channel} image = {item.image} title = {item.title} channel = {item.channel} data = {item.data} url = {item.url} />}
          />

          <Text style={{fontSize : 15, marginLeft : 12, marginTop : 5}}>
            Upcoming Events
            <Text  style={{color : 'red', fontSize : 20}}> • </Text>
          </Text>
          <FlatList
            data={[{ image : 'https://spectator.imgix.net/content/uploads/2016/07/iStock_78523505_LARGE.jpg?auto=compress,enhance,format&crop=faces,entropy,edges&fit=crop&w=620&h=413', title : 'JukeBox EDM Night - DJ SNAKE', channel : 'Resurrection 2K18', data : {location : 'Public Parking Manav Rachna', date : '01 SEPT 2018' } , url : 'Something'},
            { image : 'https://www.cascadesatthecolony.com/wp-content/uploads/2017/07/man-speaking-at-a-conference-870x490.jpg', title : 'MUN Conference 2018', channel : 'MUN Society', data : { location : 'A-Block Audi', date : '28 AUGUST 2018'}, url : 'Something'}]}
            style = {{marginLeft : 10}}
            showsHorizontalScrollIndicator = {false}
            key = {1}
            renderItem={({item}) => <FlatCard key={item.channel} image = {item.image} title = {item.title} channel = {item.channel} data = {item.data} url = {item.url} />}
          />
        </Content>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
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

export default connect(mapStateToProps)(HomeScreen);