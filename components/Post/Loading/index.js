import React from 'react';
import {
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';

import colors from '../../../colors';
import style from './style.css';

class LoadingPost extends React.Component {
  componentDidMount() {
    this.animation1.play();
    this.animation2.play();
    this.animation3.play();
  }

  render() {
    return (
      <View style={style.postWrap}>
        <View style={style.headingWrap}>
          <View style={{
            width: 35,
            height: 35,
            borderRadius: 20,
            marginRight: 6,
            backgroundColor: colors.primary.dark
          }}
          />
          <View style={style.nameDataWrap}>
            <LottieView
              ref={(animation) => { this.animation1 = animation; }}
              loop
              style={{
                    width: 180,
                    height: 21,
                    marginLeft: -2
                }}
              source={require('./assets/loadingLarge.json')}
            />
            <LottieView
              ref={(animation) => { this.animation2 = animation; }}
              loop
              style={{
                    width: 150,
                    height: 16,
                    marginLeft: -2
                }}
              source={require('./assets/loadingLarge.json')}
            />
          </View>
        </View>
        <View style={style.textWrap}>
          <LottieView
            ref={(animation) => { this.animation3 = animation; }}
            loop
            style={{
                    width: 200,
                    height: 30,
                    marginLeft: -2
                }}
            source={require('./assets/loadingLarge.json')}
          />
        </View>
      </View>
    );
  }
}


export default LoadingPost;
