import React from 'react';
import Test from './testComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import AboutUs from './AboutComponent';
import ContactUs from './ContactComponent'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
  
type RootStackParamList = {
    Menu: undefined;
    DishDetail: {dishId: number};
  };

const Stack = createStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();

function MenuStack(){
    return(
        <Stack.Navigator initialRouteName="Menu"
            screenOptions={{
                    headerStyle: {
                    backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                    },
            }}
          >
            <Stack.Screen name="Menu" component={Menu} options={{title: 'Menu'}}/>
            <Stack.Screen name="DishDetail" component={DishDetail} options={{ title: 'Dish Details' }} />
        </Stack.Navigator>
    );
}

class Main extends React.Component {

    render(){
        return(
        <NavigationContainer>
            <Drawer.Navigator   drawerStyle={{backgroundColor: '#D1C4E9', width: 240}}>
                    <Drawer.Screen name="Home" component={Home} options= {{ title: 'Home'}}/>
                    <Drawer.Screen name="AboutUs" component={AboutUs} options= {{ title: 'About'}}/>
                    <Drawer.Screen name="Menu" component={MenuStack} options= {{ title: 'Menu'}}/>
                    <Drawer.Screen name="ContactUs" component={ContactUs} options= {{ title: 'Contact'}}/>
            </Drawer.Navigator>
         </NavigationContainer>
        );
               
    }
}

export default Main;