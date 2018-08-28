import React, { Component } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Card, CardItem, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

class FlatCardChannel extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const dimensions = Dimensions.get('window');
    return (
      <View style = {{height : 120, width : 0.7 * dimensions.width}}>
        <Card>
          <CardItem cardBody>
            <Image
              resizeMethod = {'scale'}
              resizeMode = {'cover'}
              style={{height: 120, width: '100%', flex: 1, position :'absolute',  borderRadius:5, overflow:'hidden'}}
              source={{uri : this.props.image}}
            />
<<<<<<< HEAD
            <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.65)']} style={{
=======
            <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.55)']} style={{
>>>>>>> mergeFIX
              width : '100%',
              height : 120,
              top: 0
            }}>
              <View style={{flexDirection :'row', marginLeft :10, marginRight : 0, marginTop:5}}>
                <Text 
                  style={{color : 'white', flex:1, textAlign:'left', fontSize : 12, fontWeight : '500'}}>
                  {this.props.channel}
                </Text>
                <Icon size={15} name="checkmark-circle" style={{color:'white'}} />
              </View>
              <Text 
                style={{color : 'white', marginLeft : 10, marginRight : 10, marginTop : 50, fontSize : 14}}>
                {this.props.title}
              </Text>
            </LinearGradient>
          </CardItem>
        </Card>
      </View>
    );
  }
}

FlatCardChannel.propTypes = {
<<<<<<< HEAD
  image : PropTypes.object.isRequired,
  title : PropTypes.object.isRequired,
  data : PropTypes.object.isRequired,
  url : PropTypes.object.isRequired,
  channel : PropTypes.object.isRequired
=======
  image : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
  data : PropTypes.string.isRequired,
  url : PropTypes.string.isRequired,
  channel : PropTypes.string.isRequired
>>>>>>> mergeFIX
};

export default FlatCardChannel;