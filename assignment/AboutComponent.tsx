import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import {LEADERS} from '../shared/leaders';

interface State {
    leaders: typeof LEADERS
}


function History (){
    return(
        <View style={{flex: 1, marginTop: 50, alignItems: "center"}}>
            <Card featuredTitle = "Hitory"
            title="Our History">
                <Text style={{textAlign: "justify"}}>
                    {'\n'}
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon 
                    par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be 
                    found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring 
                    four of the best three-star Michelin chefs in the world, you never know what will arrive on 
                    your plate the next time you visit us.
                    {'\n\n'}
                    The restaurant traces its humble beginnings to The Frying Pan, a successful chain started 
                    by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                    {'\n\n'}
                </Text>
            </Card>
        </View>
    );
}

function Leaders(props: {leaders: typeof LEADERS}){
    if(props.leaders != null){
        const renderAboutUs = (props: {item: { name: string, description: string, id: number, designation: string}, index: number}) => {
            return (
                    <ListItem
                        key={props.index}
                        title={props.item.name}
                        titleStyle={{ fontWeight: 'bold'}}
                        subtitle={
                            <View>
                                <Text>{props.item.description}</Text>
                            </View>}
                        leftAvatar={{ source: require('./images/alberto.png')}}
                        bottomDivider
                      />
            );
        };
    
        return(
            <View style={{margin: 0}}>
                <Card title="Corporate Leadership"
                    titleStyle= {{fontWeight: 'bold'}}>
                    <FlatList 
                        data={props.leaders}
                        renderItem={renderAboutUs}
                        keyExtractor={item => item.id.toString()}
                        />
                </Card>
            </View>
        );
    }else{
        return(<View></View>);
    }
}

export default class AboutUs extends Component<{}, State> {

    constructor(props: {}){
        super(props);

        this.state = {
            leaders: LEADERS
        }
    }

    render(){
        return(
            <ScrollView>
                <History />
                <Leaders leaders={this.state.leaders}/>
            </ScrollView>
        );
    }

}