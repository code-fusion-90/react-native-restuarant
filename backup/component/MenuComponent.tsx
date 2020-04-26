import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';



function Menu(mainProps: {
            dishes: { id: number,
            name: string,
            image: string,
            category: string,
            label: string,
            price: string,
            featured: boolean,
            description: string }[],
            onPress: (dishId: number)=>void
            }
    ) {

    const renderMenuItem = (props: {item: { name: string, description: string, id: number}, index: number}) => {
        return (
                <ListItem
                    key={props.index}
                    title={props.item.name}
                    subtitle={props.item.description}
                    onPress = {()=>mainProps.onPress(props.item.id)}
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
                  />
        );
    };

    return (
         <View>
            <FlatList 
                data={mainProps.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
        </View>
    );

}


export default Menu;