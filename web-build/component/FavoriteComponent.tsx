
import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
  }

class Favorites extends Component<any> {

    render() {

        const  navigation  = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {

            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => this.props.deleteFavorite(item.id)
                }
            ];
    
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        onPress={() => navigation.navigate('DishDetail', { dishId: item.id })}
                        leftAvatar={{ source: {uri: baseUrl + item.image}}}
                        />
                 </Swipeout>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <View> 
                    <Text>
                        Loading . . . 
                    </Text>
                </View>
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter((dish: any) => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);