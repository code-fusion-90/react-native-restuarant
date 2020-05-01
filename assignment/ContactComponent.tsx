import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';


export default class ContactUs extends Component {

    render(){
        return(
        <View style={{flex: 1, marginTop: 50}}>
            <Card featuredTitle = "Contact Information"
                title = "Contact Information"
                >
                <Text>
                        {'\n'}
                        121, Clear Water Bay Road
                        {'\n\n'}
                        Clear Water Bay, Kowloon
                        {'\n\n'}
                        HONG KONG
                        {'\n\n'}
                        Tel: +852 1234 5678
                        {'\n\n'}
                        Fax: +852 8765 4321
                        {'\n\n'}
                        Email:confusion@food.net
                        {'\n'}
                </Text>
            </Card>
        </View>
        );
    }

}