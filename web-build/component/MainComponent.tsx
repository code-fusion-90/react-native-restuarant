import React from 'react';
import Test from './testComponent';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
  
type RootStackParamList = {
    Menu: undefined;
    DishDetail: {dishId: number};
  };

const Stack = createStackNavigator<RootStackParamList>();

class Main extends React.Component {

    render(){
        return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                       <Stack.Screen name="Menu" component={Menu} />
                       <Stack.Screen name="DishDetail" component={DishDetail} options={{ title: 'Dish Details' }} />
             </Stack.Navigator>
         </NavigationContainer>
        );
               
    }
}

export default Main;