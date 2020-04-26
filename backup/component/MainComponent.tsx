import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';


const Stack = createStackNavigator();

interface State {
    dishes: { id: number,
        name: string,
        image: string,
        category: string,
        label: string,
        price: string,
        featured: boolean,
        description: string }[],
    selectedDish: number
}

class Main extends React.Component< {} , State > {
    constructor(props: string){
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: -1
        }
    }

    onDishSelect(dishId: number){
        this.setState(
            {selectedDish: dishId}
        );
    }

    render(){
        return(
            <View style={{margin: 10}}>
               <Stack.Navigator>
                    <Menu dishes = {this.state.dishes} onPress = {(dishId: number)=>this.onDishSelect(dishId)}/>
                    <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0] } />
                </Stack.Navigator>
             </View>
        );
    }
}

export default Main;