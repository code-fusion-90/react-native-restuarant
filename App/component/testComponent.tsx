import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

class View1 extends Component {
    render() {
       return(
            <View style={styles.container}>
                <Text>
                    Test 1 for tab
                </Text>
            </View>
       );
    }
}


class View2 extends Component {
    render() {
       return(
            <View style={styles.container}>
                <Text>
                    Test 2 for tab
                </Text>
            </View>
       );
    }
}

function MainTabs() {
    return (
      <Tab.Navigator >
        <Tab.Screen name="View 1" component={View1} />
        <Tab.Screen name="View 2" component={View2} />
      </Tab.Navigator>
    );
  }

  const styles = StyleSheet.create({
    container: {flex: 1}
  });

export default function Test(props: string){

    return(
        <MainTabs/>
    );

}