import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import loadAnimation from "../images/loading.json";
import colors from "../styles/colors";

export const LoadInfo = () => {
   return (
      <View style={styles.container}>
         <Text style={styles.textTitle}>Buscando clientes</Text>
         <Text style={styles.textSubTitle}>
            Em breve estará pronto para o uso.
         </Text>
         <LottieView
            source={loadAnimation}
            autoPlay
            loop
            style={styles.animation}
         ></LottieView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white,
   },
   animation: {
      width: 150,
      height: 150,
      marginTop: 10
   },
   textTitle: {
      fontSize: 30,
      color: '#A66CDB',
      marginBottom: 5,
      fontWeight: '700'
   },
   textSubTitle: {
      fontSize: 18,
      color: colors.heading,
   },
});
