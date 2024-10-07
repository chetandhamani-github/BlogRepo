import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Login from './src/screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';


const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{title: 'Blog App',}}
        />
        <Stack.Screen
        name='Home'
        component={Home}
        options={{title: 'Blog Page',}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App