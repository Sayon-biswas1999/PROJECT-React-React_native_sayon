import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IPOCalendar from './components/IPOCalendar';
import CurrencyExchange from './components/CurrencyExchange';
import Login from './components/Login';
import Register from './components/Register';

const Stack = createStackNavigator();

const RegisterScreen = () => <Register />;
const LoginScreen = () => <Login />;
const HomeScreen = () => (
  <>
    <IPOCalendar />
    <CurrencyExchange />
  </>
);

export default function App() {
  const screenOptions = { headerShown: false };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register" screenOptions={screenOptions}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
