import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const MashButton = props => {
  return (
    <Pressable
      onPress={props.onPressFunction}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={({pressed}) => [
        {backgroundColor: pressed ? '#6CB0C5' : props.color},
        styles.button,
        {...props.style},
      ]}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    margin: 10,
    color: '#00f',
  },
});

export default MashButton;
