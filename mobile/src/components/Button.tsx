import React from 'react';
import { 
    TouchableOpacity,
    StyleSheet,
    Text,
    TouchableOpacityProps
} from 'react-native';

//utils
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const Button = ({ children, ...rest}: TouchableOpacityProps) => {
  return (
        <TouchableOpacity 
            style={styles.container} 
            {...rest}
        >
          <Text style={styles.text}>
            {children}
          </Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.red,
        height:56,
        borderRadius:16,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:18,
        color: colors.white,
        fontFamily: fonts.heading
    }
});