import React from 'react';
import { 
    StyleSheet,
    View 
} from 'react-native';
import LottieView from 'lottie-react-native';
import loadAnimation from '../images/loading.json';

export const Load = () => {
  return (
      <View style={styles.container}>
          <LottieView
            source={loadAnimation}
            autoPlay
            loop
            style={styles.animation}
          >
          </LottieView>
      </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0, 0.8)',
        zIndex: 9999
    },
    animation:{
        backgroundColor:'transparent',
        width:150,
        height:150
    }
});