import {Alert, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../utils/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

//KNP do

export default function Task({navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
    }
  };

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task saved successfully.');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        value={title}
        style={styles.input}
        placeholder="Title"
        onChangeText={value => setTitle(value)}></TextInput>
      <TextInput
        value={desc}
        style={styles.input}
        placeholder="Description"
        multiline
        onChangeText={value => setDesc(value)}></TextInput>
      <CustomButton
        title="Save Task"
        color="#1eb900"
        style={{width: '100%'}}
        onPressFunction={setTask}></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
});
