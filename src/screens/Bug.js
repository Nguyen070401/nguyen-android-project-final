import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import GlobalStyle from '../utils/GlobalStyle';

export default function ToDo({navigation}) {
  const dispatch = useDispatch();

  return (
    <View style={styles.body}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
});
