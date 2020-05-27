import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import configureStore from './app/redux/configureStore';
import SplashScreen from './app/screens/SplashScreen/index';
import LoginScreen from './app/screens/LoginScreen/index';
import PasswordScreen from './app/screens/PasswordScreen/index';
import HomeScreen from './app/screens/Home/index';
import CommitScreen from './app/screens/CommitScreen/index';
const store = configureStore();
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PasswordScreen"
            component={PasswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CommitScreen"
            component={CommitScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
