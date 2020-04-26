import React , {Component} from 'react';
import {Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    Menu: undefined;
    DishDetail: {dishId: number};
  };

  type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'DishDetail'>;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'DishDetail'>;

interface Props {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
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

class DishDetail extends Component<Props, State>{

    constructor(props: Props){
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

  render(){
        const { dishId } = this.props.route.params;
        const dish = this.state.dishes[dishId];
        if(dish!=null){
            return(
                    <Card featuredTitle={dish.name}
                        image={require('./images/uthappizza.png')}>
                        <Text style = {{margin: 10}}>
                            {dish.description}
                        </Text>
                    </Card>
                );
        }else{
            return(
                <View></View>
            );
        }
    }
}

export default DishDetail;