import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GlobalStyle from '../utils/GlobalStyle';

export default function ScreenA({navigation, route}) {
  const onPressHandler = () => {
    navigation.navigate('Screen_B');
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>ScreenA</Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({
          backgroundColor: pressed ? '#6CB0C5' : '##6CB0C5',
        })}>
        <Text style={styles.text2}>Go to Screen B Now!!!</Text>
      </Pressable>
      <Text style={styles.text}>{route.params?.Message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    fontSize: 40,
    margin: 10,
    alignItems: 'center',
    fontFamily: 'Roboto-Thin',
  },
  text2: {
    justifyContent: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    alignItems: 'center',
    fontFamily: 'Roboto-Thin',
  },
});
