import React, {Component} from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state: any) => {
    return {
        dishes: state.dishes
    }
}


class Menu extends Component <any>{

        constructor(props: any){
            super(props);
        }

 render(){
    const  navigation  = this.props.navigation;
    const renderMenuItem = (props: {item: any, index: number}) => {
        return (
                <Tile
                    key={props.index}
                    title={props.item.name}
                    caption={props.item.description}
                    featured
                    onPress={() => navigation.navigate('DishDetail', { dishId: props.item.id})}
                    imageSrc={{ uri: baseUrl + props.item.image }}
                  />
        );
    };

    return (
         <View>
            <FlatList 
                data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
        </View>
    );
 }

}


export default connect(mapStateToProps)(Menu);