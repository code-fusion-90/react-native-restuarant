import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './web-build/component/MainComponent'
import { Provider } from 'react-redux';
import { ConfigureStore } from './web-build/redux/configureStore';

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
  }
});