import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Utils
import colors from '../styles/colors';

//Screens
import { Home } from '../pages/Home';
import { Register } from '../pages/Register';
import { EditClient } from '../pages/EditClient';

const stackRoutes = createStackNavigator();

const AppRoutes = () =>(
    <stackRoutes.Navigator
        screenOptions={{
            cardStyle:{
                backgroundColor:colors.white
            },
            headerShown: false,
        }}
    >
        <stackRoutes.Screen 
            name="Home"
            component={ Home }
        />
        <stackRoutes.Screen 
            name="Register"
            component={ Register }
        />
        <stackRoutes.Screen 
            name="EditClient"
            component={ EditClient }
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;