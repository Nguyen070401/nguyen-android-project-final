import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const Header = props => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>KNP header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 50,
    backgroundColor: '#00f',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Header;
