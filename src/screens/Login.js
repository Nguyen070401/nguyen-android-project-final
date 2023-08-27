import React, {useState,useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, Image, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GlobalStyle from '../utils/GlobalStyle';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux';
import {setName, setAge} from '../redux/actions';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default'
  },
  () => {},
  error => {console.log(error)}
);

export default function Login({navigation}) {

  const { name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  
  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () =>{
      db.transaction((tx) =>{
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS"
          + "Users"
          + "ID INTERGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTERGER;"
        )
  })
  }

  const getData = () => {
    try {
      // AsyncStorage.getItem('UserName').then(value => {
      //   if (value != null) {
      //     navigation.navigate('Home');
      //   }
      // });
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT Name, Age FROM Users",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if(len >0){
              navigation.navigate('Home');
            }
          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert('Warning!', 'Please write your data!');
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        // var user ={
        //   Name: name,
        //   Age: age
        // }
        // await AsyncStorage.setItem('UserDate', JSON.stringify(user));
        await db.transaction(async(tx) =>{
          // await tx.excuteSql(
          //     "INSERT INTO Users(Name,Age) VALUES ("+name+","+age+")"
          // );
          await tx.executeSql(
            "INSERT INTO Users(Name, Age) VALUES (?,?)",
            [name, age]
          );
        })
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
        source={require('../../assets/redux.png')}></Image>
      <Text style={styles.text}>REDUX</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={(value) => dispatch(setName(value))}></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={(value) => dispatch(setAge(value))}></TextInput>  
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