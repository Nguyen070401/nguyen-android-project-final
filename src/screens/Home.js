import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, TextInput, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation, route}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserDate').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
          setAge(user.Age);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning!', 'Please write your data!');
    } else {
      try {
        var user ={
          Name: name
        }
        await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        Alert.alert('Success', 'Your data has been updated!');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
      try {
        await AsyncStorage.clear();
        Alert.alert('Deleted', 'Delete product Successful!');
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Welcome {name}</Text>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>Your age is:  {age}</Text>
      <TextInput
        style={styles.input}
        placeHodler='Enter your name'
        value={name}
        onChangeText={(value) =>setName(value)}
      ></TextInput>
      <CustomButton
        title="Update"
        color="#ff7f00"
        onPressFunction={updateData}></CustomButton>
      <CustomButton
        title="Deleted"
        color="#f40100"
        onPressFunction={removeData}></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
      fontSize: 40,
      margin: 10,      
      marginBottom: 10,
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
  }
});
