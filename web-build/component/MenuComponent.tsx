import React, {Component} from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import Test from './testComponent';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Menu: undefined;
    DishDetail: {dishId: number};
  };

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'Menu'>;

interface Props {
    navigation: ProfileScreenNavigationProp;
}

interface State {
    dishes: { id: number,
        name: string,
        image: string,
        category: string,
        label: string,
        price: string,
        featured: boolean,
        description: string }[]
}

class Menu extends Component <Props, State>{

        constructor(props: Props){
            super(props);
            this.state = {
                dishes: DISHES
            }
        }

 render(){
    const  navigation  = this.props.navigation;
    const renderMenuItem = (props: {item: { name: string, description: string, id: number}, index: number}) => {
        return (
                <ListItem
                    key={props.index}
                    title={props.item.name}
                    subtitle={props.item.description}
                    onPress={() => navigation.navigate('DishDetail', { dishId: props.item.id})}
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
                  />
        );
    };

    return (
         <View>
            <FlatList 
                data={this.state.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
        </View>
    );
 }

}


export default Menu;