import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'DailyTasks' }} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'New Task' }} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Task Details' }} />
    </Stack.Navigator>
  );
}