import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge, increaseAge, getCities} from '../redux/actions';
import PushNotification from 'react-native-push-notification';

//KNP do
const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export default function Home({navigation, route}) {
  const {name, age, cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {
    getData();
    dispatch(getCities());
  }, []);

  const getData = () => {
    try {
      // AsyncStorage.getItem('UserDate').then(value => {
      //   if (value != null) {
      //     let user = JSON.parse(value);
      //     setName(user.Name);
      //     setAge(user.Age);
      //   }
      // });
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            dispatch(setName(userName));
            dispatch(setAge(userAge));
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleNotification = item => {
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: 'You clicked on' + item.country,
  //     message: item.title,
  //   });
  // };

  const handleNotification = (item, index) => {
    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You clicked on' + item.country,
      message: item.city,
      bigText:
        item.city + ' is one of the most beautiful city in' + item.country,
      color: '#6CB0C5',
      id: index,
    });

    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Alarm',
      message: 'You clicked on ' + item.country + ' 20 seconds ago!',
      date: new Date(Date.now() + 20 * 1000),
      allowWhileIdle: true,
    });
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning!', 'Please write your data!');
    } else {
      try {
        // var user ={
        //   Name: name
        // }
        // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        // Alert.alert('Success', 'Your data has been updated!');
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE Users SET Name=?',
            [name],
            () => {
              Alert.alert('Success!', 'Your data has been removed');
            },
            error => {
              console.log(error);
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      // await AsyncStorage.clear();
      // Alert.alert('Deleted', 'Delete product Successful!');
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {
            navigation.navigate('Login');
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Welcome {name} !
      </Text>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Your age is: {age}
      </Text>
      <FlatList
        data={cities}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              handleNotification(item, index);
              navigation.navigate('Map', {
                city: item.city,
                lat: item.lat,
                lng: item.lng,
              });
            }}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.country}</Text>
              <Text style={styles.subtitle}>{item.city}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}></FlatList>
      {/* <TextInput
        style={styles.input}
        placeHodler='Enter your name'
        value={name}
        onChangeText={(value) =>dispatch(setName(value))}
      ></TextInput>
      <CustomButton
        title="Update"
        color="#ff7f00"
        onPressFunction={updateData}></CustomButton>
      <CustomButton
        title="Deleted"
        color="#f40100"
        onPressFunction={removeData}></CustomButton>
      <CustomButton
        title='Increase Age'
        color='#0080ff'
        onPressFunction={()=>{dispatch(increaseAge())}}
      ></CustomButton>   */}
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
  },
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    color: '#999999',
  },
});
