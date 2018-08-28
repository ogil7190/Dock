import React, { Component } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Card, CardItem, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

class FlatCard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const dimensions = Dimensions.get('window');
    return (
      <View style = {{height : 180, width : 0.95 * dimensions.width, marginTop:5, borderRadius:5, marginBottom:2, overflow:'hidden'}}>
        <Card>
          <CardItem cardBody button onPress = {this.props.onPress} style={{overflow:'hidden',borderRadius : 8,}}>
            <Image
              resizeMethod = {'scale'}
              resizeMode = {'cover'}
              style={{height: 180, width: '100%', flex: 1, position :'absolute',  borderRadius:5, overflow:'hidden'}}
              source={{uri : this.props.image}}
            />
            <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.8)']} style={{
              width : '100%',
              height : 180,
              overflow:'hidden',
              borderRadius : 8,
              top: 0
            }}>
              <View style={{flexDirection :'row', marginLeft :10, marginRight : 0, marginTop:5}}>
                <Text 
                  style={{color : 'white', flex:1, textAlign:'left', fontSize : 14, fontWeight : '500'}}>
                  {this.props.channel}
                </Text>
              </View>
              <Text 
                style={{color : 'white', marginLeft : 10, marginRight : 10, marginTop : 50, fontSize : 20}}>
                {this.props.title}
              </Text>
              <Text 
                style={{color : 'white', marginLeft : 15, marginRight : 10, marginTop : 10, fontSize : 15}}>
                <Icon name='pin' style={{color:'white', fontSize:20}}/>
                {'  '+this.props.data.location}
              </Text>
              <Text 
                style={{color : 'white', marginLeft : 15, marginRight : 10, marginTop : 10, fontSize : 15}}>
                <Icon name='calendar' style={{color:'white', fontSize:20}}/>
                {'  '+this.props.data.date}
              </Text>
            </LinearGradient>
          </CardItem>
        </Card>
      </View>
    );
  }
}

FlatCard.propTypes = {
  image : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
  data : PropTypes.object.isRequired,
  url : PropTypes.string.isRequired,
  channel : PropTypes.string.isRequired,
  onPress : PropTypes.func.isRequired
};

export default FlatCard;