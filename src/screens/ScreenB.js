import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GlobalStyle from '../utils/GlobalStyle';

export default function ScreenB({navigation, route}) {
  const {ItemName, ItemId} = route.params;

  const onPressHandler = () => {
    navigation.navigate('Screen_A', {Message: 'message from B'});
    // navigation.goBack();
    // navigation.setParams({ItemId: 14});
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.ButtonText, styles.text]}>ScreenB</Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({
          backgroundColor: pressed ? '#6CB0C5' : '##6CB0C5',
        })}>
        <Text style={styles.text2}>Go to Screen A</Text>
      </Pressable>
      <Text style={styles.text2}>{ItemName}</Text>
      <Text style={styles.text2}>ID: {ItemId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto-Thin',
  },
  text: {
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
  },
  text2: {
    justifyContent: 'center',
    fontSize: 40,
    margin: 10,
    alignItems: 'center',
    fontFamily: 'Roboto-Italic',
  },
});
