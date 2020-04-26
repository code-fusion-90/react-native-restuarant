import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './web-build/component/MainComponent'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <Main />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
  }
});