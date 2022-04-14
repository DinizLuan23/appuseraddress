import React from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import {
   useFonts,
   Jost_400Regular,
   Jost_600SemiBold,
} from "@expo-google-fonts/jost";

//rotas
import Routes from "./src/routes";

export default function App() {

   const [fontsLoaded] = useFonts({
      Jost_400Regular,
      Jost_600SemiBold,
   });

   if (!fontsLoaded) {
      return <AppLoading />;
   }

   return (
      <>
         <StatusBar style="light" backgroundColor="#43299B" />
         <Routes />
      </>
   );
}
