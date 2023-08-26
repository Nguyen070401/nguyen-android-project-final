import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Login from './screens/Login';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShow: false,
          }}></Stack.Screen>

        <Stack.Screen name="Home" component={Home}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
