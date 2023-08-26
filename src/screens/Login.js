import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, Image, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GlobalStyle from '../utils/GlobalStyle';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const getData = () => {
    try {
      AsyncStorage.getItem('UserName').then(value => {
        if (value != null) {
          navigation.navigate('Home');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert('Warning!', 'Please write your data!');
    } else {
      try {
        var user ={
          Name: name,
          Age: age
        }
        await AsyncStorage.setItem('UserDate', JSON.stringify(user));
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/japan-anh-final.jpg')}></Image>
      <Text style={styles.text}>Async Storage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => setName(value)}></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={value => setAge(value)}></TextInput>  
      <CustomButton
        title="login"
        color="#1eb900"
        onPressFunction={setData}></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6CB0C5',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 100,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
