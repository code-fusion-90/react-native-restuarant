import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state: any) => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}


function RenderItem(props: {item: any}){
    const item = props.item;
    if(item != null){
        return(
            <Card featuredTitle = {item.name}
                featuredSubtitle = {item.designation}
                image={{uri: baseUrl + item.image }}
                >
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }else{
        return(
            <View></View>
        );
    }
}

class Home extends Component<any> {
    constructor(props: any){
        super(props);
    }

    render() {
        return(
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish: any) => dish.featured)[0]} />
                <RenderItem item={this.props.promotions.promotions.filter((promo: any) => promo.featured)[0]} />
                <RenderItem item={this.props.leaders.leaders.filter((leader: any) => leader.featured)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);